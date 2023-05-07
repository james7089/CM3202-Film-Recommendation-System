"""
Movie router
"""

from fastapi import APIRouter, HTTPException, Request, Response
from tmdb.tmdb_api import TmdbApi;

router = APIRouter(prefix="/search", tags=["Search"])

@router.get("/{mediaType}")
async def getCatergory(req: Request, res: Response):
    """Gets search result"""
    mediaType = req.path_params['mediaType']
    query = req.query_params.get('query')
    page = req.query_params.get('page')

    res = await TmdbApi.search(mediaType, query, page)
    return res
