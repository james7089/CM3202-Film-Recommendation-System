from tmdb.tmdb_config import get_url

class TmdbEndpoints:
    @staticmethod
    def movie_list(movie_category, page):
        return get_url(f"movie/{movie_category}", {"page": page})

    @staticmethod
    def movie_details(movie_id):
        return get_url(f"movie/{movie_id}")

    @staticmethod
    def movie_genres():
        return get_url(f"genre/movie/list")

    @staticmethod
    def movie_credits(movie_id):
        return get_url(f"movie/{movie_id}/credits")

    @staticmethod
    def movie_videos(movie_id):
        return get_url(f"movie/{movie_id}/videos")

    @staticmethod
    def movie_images(movie_id):
        return get_url(f"movie/{movie_id}/images")

    @staticmethod
    def movie_recommend(movie_id):
        return get_url(f"movie/{movie_id}/recommendations")

    @staticmethod
    def movie_search(query, page):
        return get_url(f"search/movie", {"query": query, "page": page})

    @staticmethod
    def person_detail(person_id):
        return get_url(f"person/{person_id}")

    @staticmethod
    def person_movies(person_id):
        return get_url(f"person/{person_id}/combined_credits")

tmdb_endpoints = TmdbEndpoints()