"""
Rating router
"""

from fastapi import APIRouter, Depends, Request, Response
import asyncio

from models.user import User, MovieRating
from api.dependencies import current_user
from api.dependencies import getMovieDetails

router = APIRouter(prefix="/rating", tags=["Rating"])

@router.get("/{movieId}")
async def get_user(req: Request, user: User = Depends(current_user)):
    """Returns user rating of movie"""
    movie_id = req.path_params['movieId']
    rating = None
    for movie_rating in user.movie_ratings:
        if movie_rating.movie_id == movie_id:
            rating = movie_rating.rating
            break
    return rating

@router.post("/{movieId}")
async def rate_movie(req: Request, user: User = Depends(current_user)):
    """Adds/Updates movie rating to user"""
    movie_id = req.path_params['movieId']
    rating = req.query_params.get('newRating')

    movie_rating = MovieRating(movie_id=movie_id, rating=rating)
    
    new_movie_ratings_array = [mr for mr in user.movie_ratings if mr.movie_id != movie_rating.movie_id]

    user.movie_ratings = new_movie_ratings_array + [movie_rating]
    await user.save()
    return Response(status_code=200)

@router.get("/rated/movies")
async def get_user(res: Response, user: User = Depends(current_user)):
    """Returns rated movies"""
    rated = [mr.movie_id for mr in user.movie_ratings]
    
    res = await asyncio.gather(*map(getMovieDetails, rated))
    
    return res
