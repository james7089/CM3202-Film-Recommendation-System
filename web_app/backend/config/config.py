from typing import Optional

from beanie import init_beanie
from pydantic import BaseSettings
from motor.motor_asyncio import AsyncIOMotorClient

import os


class Settings(BaseSettings):
    # database configurations
    DATABASE_URL: Optional[str] = None
    DATABASE_NAME: Optional[str] = None

    # JWT
    SECRET: Optional[str] = None

    class Config:
        case_sensitive = False
        env_file = f"{os.path.dirname(os.path.abspath(__file__))}/../.env.dev"
        orm_mode = True


async def initiate_database(db, User):
    await init_beanie(database=db,
                  document_models=[User])

