from client.http_client import get
from tmdb.tmdb_endpoints import tmdb_endpoints

class TmdbApi:
    @staticmethod
    async def movie_list(movie_category, page):
        return await get(tmdb_endpoints.movie_list(movie_category, page))

    @staticmethod
    async def movie_details(movie_id):
        return await get(tmdb_endpoints.movie_details(movie_id))

    @staticmethod
    async def movie_genres():
        return await get(tmdb_endpoints.movie_genres())

    @staticmethod
    async def movie_credits(movie_id):
        return await get(tmdb_endpoints.movie_credits(movie_id))

    @staticmethod
    async def movie_videos(movie_id):
        return await get(tmdb_endpoints.movie_videos(movie_id))

    @staticmethod
    async def movie_images(movie_id):
        return await get(tmdb_endpoints.movie_images(movie_id))

    @staticmethod
    async def movie_recommend(movie_id):
        return await get(tmdb_endpoints.movie_recommend(movie_id))

    @staticmethod
    async def search(mediaType, query, page):
        return await get(tmdb_endpoints.search(mediaType, query, page))

    @staticmethod
    async def person_detail(person_id):
        return await get(tmdb_endpoints.person_detail(person_id))

    @staticmethod
    async def person_movies(person_id):
        return await get(tmdb_endpoints.person_movies(person_id))