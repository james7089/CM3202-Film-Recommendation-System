import motor.motor_asyncio
from fastapi_users.db import BeanieUserDatabase

from config.config import Settings
from models.user import User


client = motor.motor_asyncio.AsyncIOMotorClient(
    Settings().DATABASE_URL, uuidRepresentation="standard"
)
db = client[Settings().DATABASE_NAME]

async def get_user_db():
    yield BeanieUserDatabase(User)