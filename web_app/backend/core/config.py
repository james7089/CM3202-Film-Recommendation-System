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

   # FastMail SMTP server settings
    MAIL_CONSOLE = config("MAIL_CONSOLE", default=False, cast=bool)
    MAIL_SERVER = config("MAIL_SERVER", default="smtp.myserver.io")
    MAIL_PORT = config("MAIL_PORT", default=587, cast=int)
    MAIL_USERNAME= config("MAIL_USERNAME", default="")
    MAIL_PASSWORD = config("MAIL_PASSWORD", default="")
    MAIL_SENDER = config("MAIL_SENDER", default="noreply@myserver.io")

    TESTING = config("TESTING", default=False, cast=bool)

settings = Settings()