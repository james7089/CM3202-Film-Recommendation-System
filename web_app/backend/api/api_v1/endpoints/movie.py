"""
Movie router
"""

from fastapi import APIRouter, Request, Response
from tmdb.tmdb_api import TmdbApi;

from api.dependencies import getMovieDetails


router = APIRouter(prefix="/movie", tags=["Movie"])

@router.get("/genres")
async def getGenres(res: Response):
    """Gets a list of all film genres"""
    res = await TmdbApi.movie_genres()
    return res

@router.get("/{movieCategory}")
async def getCatergory(req: Request, res: Response):
    """Gets a list of films based on catergory (popular or top_rated)"""
    page = req.query_params.get('page')
    movieCategory = req.path_params['movieCategory']
    
    res = await TmdbApi.movie_list(movieCategory, page)
    return res

@router.get("/details/{movieId}")
async def getDetails(req: Request, res: Response):
    """Gets details of a film"""
    movieId = req.path_params['movieId']
    
    res = await getMovieDetails(movieId)

    return res

