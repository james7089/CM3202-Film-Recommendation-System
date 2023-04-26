from fastapi.middleware.cors import CORSMiddleware

from core.config import settings

def add_cors_middleware(app):
    #print(settings.BACKEND_CORS_ORIGINS)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )