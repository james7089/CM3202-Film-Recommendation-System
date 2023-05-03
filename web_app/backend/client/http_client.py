from httpx import AsyncClient;

async def get(url: str):
    headers = {
        "Accept": "application/json",
        "Accept-Encoding": "identity",
    }
    async with AsyncClient() as client:
        response = await client.get(url, headers=headers)
    return response.json()
