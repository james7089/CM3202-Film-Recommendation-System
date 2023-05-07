"""
Person router
"""

from fastapi import APIRouter, HTTPException, Request, Response
from tmdb.tmdb_api import TmdbApi;

router = APIRouter(prefix="/person", tags=["Person"])

@router.get("/{personId}")
async def getDetails(req: Request, res: Response):
    """Gets details of person"""
    personId = req.path_params['personId']
    
    res = await TmdbApi.person_detail(personId)
    return res

@router.get("/{personId}/movies")
async def getMovies(req: Request, res: Response):
    """Gets a list of films cast has stared in"""
    personId = req.path_params['personId']
    
    res = await TmdbApi.person_movies(personId)
    return res

@router.get("/search")
async def getSearchResult(req: Request, res: Response):
    """Gets search result"""
    query = req.query_params.get('query')
    page = req.query_params.get('page')
    
    res = await TmdbApi.person_search(query, page)

    return res
