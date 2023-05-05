"""
Server app config
"""

# pylint: disable=import-error

from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from core.config import settings
from models.user import User
from middleware.middleware import add_cors_middleware
from handlers.jwt_config import jwt_exception_handler
from api.api_v1.endpoints.auth import router as AuthRouter
from api.api_v1.endpoints.movie import router as MovieRouter
from api.api_v1.endpoints.person import router as PersonRouter
from api.api_v1.endpoints.register import router as RegisterRouter
from api.api_v1.endpoints.user import router as UserRouter
from api.api_v1.endpoints.rating import router as RatingRouter

app = FastAPI(debug=True)

add_cors_middleware(app)

app.add_exception_handler(AuthJWTException, jwt_exception_handler)

app.include_router(AuthRouter)
app.include_router(MovieRouter)
app.include_router(PersonRouter)
app.include_router(RegisterRouter)
app.include_router(UserRouter)
app.include_router(RatingRouter)

@app.on_event("startup")
async def app_init():
    """Initialize application services"""
    client = AsyncIOMotorClient(
        settings.MONGO_URI, uuidRepresentation="standard"
    )
    db = client[settings.DATABASE_NAME]
    
    await init_beanie(
        database=db, 
        document_models=[
            User
        ]
    )
