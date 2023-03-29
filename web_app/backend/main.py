import uvicorn

if __name__ == '__main__':
    uvicorn.run('app:app', log_level="debug", host="localhost", port=8000, reload=True)