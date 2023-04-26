"""
FastAPI server configuration
"""
import pathlib
from typing import Optional, List, Union

from pydantic import BaseSettings, AnyHttpUrl, validator


class Settings(BaseSettings):
    """Server config settings"""

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Database settings
    MONGO_URI: Optional[str] = None
    DATABASE_NAME: Optional[str] = None

    # Security settings
    ACCESS_TOKEN_SECRET: Optional[str] = None
    REFRESH_TOKEN_SECRET: Optional[str] = None
    
    SALT: Optional[bytes] = None

    @validator("SALT", pre=True)
    def convert_salt_to_bytes(cls, v: Optional[str]) -> Optional[bytes]:
        if v is not None:
            return v.encode()
        return None

    # FastMail SMTP server settings
    MAIL_CONSOLE: Optional[bool] = None
    MAIL_SERVER: Optional[str] = None
    MAIL_PORT: Optional[int] = None
    MAIL_USERNAME: Optional[str] = None
    MAIL_PASSWORD: Optional[str] = None
    MAIL_SENDER: Optional[str] = None

    TESTING: Optional[bool] = None

    class Config:
        case_sensitive = False
        env_file = pathlib.Path(__file__).parent.parent / ".env"

settings = Settings()

""" with open(pathlib.Path(__file__).parent.parent  / ".env", "r") as file:
    print(file.read()) """