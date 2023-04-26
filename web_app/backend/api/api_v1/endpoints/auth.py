"""
Authentication router
"""
from datetime import timedelta

from fastapi import APIRouter, HTTPException, Depends, Response, Request, status
from fastapi_jwt_auth import AuthJWT

from models.user import User, UserAuth
from api.dependencies import hash_password


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
async def login(req: Request, res: Response, user_auth: UserAuth, auth: AuthJWT = Depends()):
    """Authenticates and returns the user's JWT"""
    cookies = req.cookies
    
    found_user = await User.by_email(user_auth.email)
    if found_user is None or hash_password(user_auth.password) != found_user.password:
        raise HTTPException(status_code=401, detail="Bad email or password")
    
    # Create JWTs
    access_token = auth.create_access_token(subject=found_user.email, expires_time=timedelta(minutes=15))
    new_refresh_token = auth.create_refresh_token(subject=found_user.email, expires_time=timedelta(days=30))
    
    new_refresh_token_array = found_user.refresh_tokens if "refresh_token_cookie" not in cookies else [rt for rt in found_user.refresh_tokens if rt != cookies["refresh_token_cookie"]]
    
    if "refresh_token_cookie" in cookies:
        refresh_token = cookies["refresh_token_cookie"]
        found_token = await User.by_refresh_token(refresh_token)
        if found_token is None:
            new_refresh_token_array = []
    
    found_user.refresh_tokens = new_refresh_token_array + [new_refresh_token]
    await found_user.save()

    auth.set_refresh_cookies(new_refresh_token)
    return access_token

@router.post("/logout")
async def logout(req: Request, res: Response, auth: AuthJWT = Depends()):
    """Logs user out by deleting their refresh token cookie and in database, access token deleted client side"""
    cookies = req.cookies
    if "refresh_token_cookie" not in cookies:
        res.status_code = status.HTTP_204_NO_CONTENT
        return res
    refresh_token = cookies["refresh_token_cookie"]

    #checks db for refresh token
    found_user = await User.by_refresh_token(refresh_token)
    if found_user is None:
        auth.unset_refresh_cookies()
        res.status_code = status.HTTP_204_NO_CONTENT
        return res
    
    #delete refresh token in db
    found_user.refresh_tokens = [rt for rt in found_user.refresh_tokens if rt != refresh_token]
    await found_user.save()

    auth.unset_refresh_cookies()
    res.status_code = status.HTTP_204_NO_CONTENT
    return res

@router.get("/refresh")
async def refresh(req: Request, res: Response, auth: AuthJWT = Depends()):
    """Returns a new access token from a refresh token"""
    #verify refresh token, save refresh token then clear cookie
    refresh_token = req.cookies["refresh_token_cookie"]

    auth._verify_and_get_jwt_in_cookies('refresh', req)
  
    found_user = await User.by_refresh_token(refresh_token)

    #Detected refresh token reuse
    if found_user == None:
        #Delete refresh tokens of hacked user
        hacked_user = await User.by_email(auth.get_jwt_subject())
        hacked_user.refresh_tokens = []
        await hacked_user.save()
        raise HTTPException(status_code=403, detail="Refresh token reused")
    
    new_refresh_token_array = [rt for rt in found_user.refresh_tokens if rt != refresh_token]

    # Create JWTs
    access_token = auth.create_access_token(subject=found_user.email, expires_time=timedelta(minutes=15))
    new_refresh_token = auth.create_refresh_token(subject=found_user.email, expires_time=timedelta(days=30))

    #Save refresh token to current user
    found_user.refresh_tokens = new_refresh_token_array + [new_refresh_token]
    await found_user.save()

    auth.set_refresh_cookies(new_refresh_token)
    return access_token
