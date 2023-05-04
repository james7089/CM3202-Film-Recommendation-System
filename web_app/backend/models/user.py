"""
User models
"""

# pylint: disable=too-few-public-methods

from datetime import datetime
from typing import Optional

from beanie import Document, Indexed
from beanie.operators import ElemMatch
from pydantic import BaseModel, EmailStr


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
    email_confirmed_at: Optional[datetime] = None

    def __repr__(self) -> str:
        return f"<User {self.email}>"

    def __str__(self) -> str:
        return self.email

    def __hash__(self) -> int:
        return hash(self.email)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, User):
            return self.email == other.email
        return False

    @property
    def created(self) -> datetime:
        """Datetime user was created from ID"""
        return self.id.generation_time

    @classmethod
    async def by_email(cls, email: str) -> "User":
        """Get a user by email"""
        return await cls.find_one(cls.email == email)
    """Here"""
    @classmethod
    async def by_refresh_token(cls, refresh_token: str) -> "User":
        """Get a user by refresh token"""
        return await cls.find_one({cls.refresh_tokens: refresh_token})
