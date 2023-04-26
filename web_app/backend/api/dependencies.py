"""
Dependancy functions
"""
import bcrypt

from core.config import settings
from fastapi import Depends, HTTPException
from fastapi_jwt_auth import AuthJWT


from models.user import User

async def current_user(auth: AuthJWT = Depends()) -> User:
    """Returns the current authorized user"""
    auth.jwt_required()
    user = await User.by_email(auth.get_jwt_subject())
    if user is None:
        raise HTTPException(404, "Authorized user could not be found")
    return user

def hash_password(password: str) -> str:
    """Returns a salted password hash"""
    return bcrypt.hashpw(password.encode(), settings.SALT).decode()