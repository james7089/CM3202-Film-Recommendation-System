"""
Registration router
"""

from fastapi import APIRouter, Body, Depends, HTTPException, Response
from fastapi_jwt_auth import AuthJWT
from pydantic import EmailStr

from models.user import User, UserAuth, UserOut
from api.dependencies import hash_password

router = APIRouter(prefix="/register", tags=["Register"])


@router.post("")
async def user_registration(user_auth: UserAuth):
    """Creates a new user"""
    user = await User.by_email(user_auth.email)
    if user is not None:
        raise HTTPException(409, "User with that email already exists")
    hashed = hash_password(user_auth.password)
    user = User(email=user_auth.email, password=hashed)
    await user.create()
    return Response(status_code=200)