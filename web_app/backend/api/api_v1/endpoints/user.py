"""
User router
"""

from fastapi import APIRouter, Depends, Request, Response
from fastapi_jwt_auth import AuthJWT

from models.user import User, UserOut, UserUpdate
from api.dependencies import current_user

router = APIRouter(prefix="/user", tags=["User"])

#user: User = Depends(current_user)
#response_model=UserOut

@router.get("", response_model=UserOut)
async def get_user(req: Request, user: User = Depends(current_user)):
    """Returns the current user"""
    print(req.headers)
    return user


@router.patch("", response_model=UserOut)
async def update_user(update: UserUpdate, user: User = Depends(current_user)):
    """Update allowed user fields"""
    user = user.copy(update=update.dict(exclude_unset=True))
    await user.save()
    return user


@router.delete("")
async def delete_user(auth: AuthJWT = Depends()):
    """Delete current user"""
    auth.jwt_required()
    await User.find_one(User.email == auth.get_jwt_subject()).delete()
    return Response(status_code=204)
