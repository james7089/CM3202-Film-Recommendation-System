from fastapi import APIRouter, HTTPException, Request, Response
from tmdb.tmdb_api import TmdbApi;

router = APIRouter(prefix="/person", tags=["Person"])

@router.get("/{personId}")
async def getList(req: Request, res: Response):
    """Gets of cast memember"""
    personId = req.path_params['personId']
    
    res = await TmdbApi.person_detail(personId)
    return res

@router.get("/{personId}/movies")
async def getList(req: Request, res: Response):
    """Gets a list of films cast has stared in"""
    personId = req.path_params['personId']
    
    res = await TmdbApi.person_movies(personId)
    return res
