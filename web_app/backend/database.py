from model import Todo

# MongoDB driver
import motor.motor_asyncio
from dotenv import dotenv_values
import os

config = dotenv_values('.env')
DATABASE_URI = config.get('DATABASE_URI')
if os.getenv('DATABASE_URI'):
    DATABASE_URI = os.getenv('DATABASE_URI')

client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)

database = client.TodoList
collection = database.todo


async def fetch_one_todo(title):
    document = collection.find_one({'title': title})
    return document


async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos


async def create_todo(todo):
    document = todo
    result = await collection.insert_one(document)
    return document


async def update_todo(title, desc):
    await collection.update_one({'title': title}, 
                                {'$set': {'description': desc}})
    document = await collection.find_one({'title':title})
    return document
    
async def remove_todo(title):
    await collection.delete_one({'title':title})
    return True