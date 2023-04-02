from fastapi import FastAPI, Depends

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.config import initiate_database
from database.database import db
from models.user import User
from routers import auth, user
from schemas.schemas import UserCreate, UserRead, UserUpdate
from controllers.users import auth_backend, current_active_user, fastapi_users

app = FastAPI()

# register origins
origins = [
    "*",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)

@app.get("/")
async def root():
    return {"page": "root"}


@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}



@app.on_event("startup")
async def start_database():
    await initiate_database(db, User)
