"""
User models
"""

# pylint: disable=too-few-public-methods

from datetime import datetime
from typing import Optional, List

from beanie import Document, Indexed
from beanie.operators import ElemMatch
from pydantic import BaseModel, EmailStr

class MovieRating(BaseModel):
    movie_id: str
    rating: int

    class Config:
        orm_mode = True

class MovieWatchValue(BaseModel):
    movie_id: str
    watch_value: int

    class Config:
        orm_mode = True


class UserAuth(BaseModel):
    """User register and login auth"""

    email: EmailStr
    password: str

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    """Updatable user fields"""

    email: Optional[EmailStr] = None

    #Refresh token
    refresh_tokens: Optional[list[str]] = []

    class Config:
        orm_mode = True


class UserOut(UserUpdate):
    """User fields returned to the client"""

    email: Indexed(EmailStr, unique=True)
    disabled: bool = False


class User(Document, UserOut):
    """User DB representation"""

    password: str
    movie_ratings: List[MovieRating] = []
    watch_list: List[MovieWatchValue] = []

    @classmethod
    async def by_email(cls, email: str) -> "User":
        """Get a user by email"""
        return await cls.find_one(cls.email == email)
    """Here"""
    @classmethod
    async def by_refresh_token(cls, refresh_token: str) -> "User":
        """Get a user by refresh token"""
        return await cls.find_one({cls.refresh_tokens: refresh_token})
