from fastapi import APIRouter
from schemas.schemas import UserRead, UserUpdate
from controllers.users import fastapi_users

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
)