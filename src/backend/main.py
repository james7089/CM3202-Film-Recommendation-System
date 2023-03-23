from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

#start up using uvicorn main:app --reload 

#App object
app = FastAPI()

origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def root():
    return {"Ping": "Pong"}
