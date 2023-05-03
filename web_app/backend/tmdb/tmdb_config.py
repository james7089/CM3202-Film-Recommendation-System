from core.config import settings
from urllib.parse import urlencode, urljoin

base_url = settings.TMDB_BASE_URL
key = settings.TMDB_KEY

def get_url(endpoint, params={}):
    query_params = {"api_key": key, **params}
    query_string = urlencode(query_params)
    return urljoin(base_url, f"{endpoint}?{query_string}")
