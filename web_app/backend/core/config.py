"""
FastAPI server configuration
"""
from decouple import config
from pydantic import BaseModel


class Settings(BaseModel):
    """Server config settings"""

    BACKEND_CORS_ORIGINS = config("BACKEND_CORS_ORIGINS")

    # Database settings
    MONGO_URI = config("MONGO_URI")
    DATABASE_NAME = config("DATABASE_NAME")

    # Security settings
    authjwt_secret_key = config("ACCESS_TOKEN_SECRET")
    authjwt_token_location: set = {"headers", "cookies"}
    authjwt_cookie_csrf_protect: bool = False

    #TMDB Settings
    TMDB_BASE_URL = config("TMDB_BASE_URL")
    TMDB_KEY = config("TMDB_KEY")
    
    SALT = config("SALT").encode()

settings = Settings()