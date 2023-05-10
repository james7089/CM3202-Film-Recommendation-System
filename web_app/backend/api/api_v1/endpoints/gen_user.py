"""
User router
"""
import csv
from fastapi import APIRouter

from api.dependencies import hash_password
from models.user import User, MovieRating

router = APIRouter(prefix="/populate", tags=["Populate"])

async def create_users_from_csv(file_path: str = 'utils/ratings_data.csv'):
    users = {}
    with open(file_path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            user_id = int(row['userId'])
            movie_rating = MovieRating(movie_id=row['movieId'], rating=float(row['rating']))
            if user_id in users:
                users[user_id]['movie_ratings'].append(movie_rating)
            else:
                email = f"user{user_id}@example.com"
                password = hash_password(f"user{user_id}")
                users[user_id] = {
                    'email': email,
                    'password': password,
                    'movie_ratings': [movie_rating]
                }

    return users

# FastAPI endpoint to populate the MongoDB database
@router.post("/user_data")
async def populate_db():
    users_data = await create_users_from_csv("ratings_data.csv")
    for user_id, user_data in users_data.items():
        user = User(
            email=user_data['email'],
            password=user_data['password'],
            movie_ratings=user_data['movie_ratings']
        )
        await user.insert()

    return {"message": "User data populated successfully"}