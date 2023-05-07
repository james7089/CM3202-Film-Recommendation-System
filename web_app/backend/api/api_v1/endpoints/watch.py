"""
WatchList router
"""

from fastapi import APIRouter, Depends, Request, Response
import asyncio

from models.user import User, MovieWatchValue
from api.dependencies import current_user
from api.dependencies import getMovieDetails

router = APIRouter(prefix="/watch", tags=["Watch"])

@router.get("/{movieId}")
async def get_user(req: Request, user: User = Depends(current_user)):
    """Returns watch list value of a movie"""
    movie_id = req.path_params['movieId']
    rating = None
    for movie_rating in user.movie_ratings:
        if movie_rating.movie_id == movie_id:
            rating = movie_rating.rating
            break
    return rating

@router.post("/{movieId}")
async def set_watch_value_movie(req: Request, user: User = Depends(current_user)):
    """Adds movie to watch list"""
    movie_id = req.path_params['movieId']
    newWatchValue = req.query_params.get('newWatchValue')

    movie_watch_value = MovieWatchValue(movie_id=movie_id, watch_value=newWatchValue)
    
    new_movie_watch_value_array = [mwv for mwv in user.watch_list if mwv.movie_id != movie_watch_value.movie_id]

    user.watch_list = new_movie_watch_value_array + [movie_watch_value]
    await user.save()
    return Response(status_code=200)

@router.delete("/{movieId}")
async def delete_watch_value_movie(req: Request, user: User = Depends(current_user)):
    """Deletes movie from watch list"""
    movie_id = req.path_params['movieId']
    
    new_movie_watch_value_array = [mwv for mwv in user.watch_list if mwv.movie_id != movie_id]

    user.watch_list = new_movie_watch_value_array
    await user.save()
    return Response(status_code=200)

@router.get("/list/movies")
async def get_user(res: Response, user: User = Depends(current_user)):
    """Returns watch list movies"""
    watch_list = [w.movie_id for w in user.watch_list]
    
    res = await asyncio.gather(*map(getMovieDetails, watch_list))
    
    return res