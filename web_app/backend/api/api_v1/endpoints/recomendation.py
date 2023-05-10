import pandas as pd
from surprise import dump
import asyncio

from fastapi import APIRouter, Depends
from models.user import User
from api.dependencies import getMovieDetails, current_user


router = APIRouter(prefix="/recommendation", tags=["Recommendation"])

# Function to query the database and retrieve user and movie rating data
async def get_user_movie_ratings():
    users = await User.all().to_list()
    data = []
    for user in users:
        for movie_rating in user.movie_ratings:
            data.append({
                'userId': user.id,
                'movieId': movie_rating.movie_id,
                'rating': movie_rating.rating
            })
    return data

# Function to convert the retrieved data into a pandas DataFrame
def create_dataframe_from_data(data):
    df = pd.DataFrame(data, columns=['userId', 'movieId', 'rating'])
    return df

def load_svd_algo():
    svd = dump.load('svd_model')
    svd_algo = svd[1]
    return svd_algo

def pred_user_rating(ui, df, svd_algo):
    ui_list = df[df.userId == ui].movieId.tolist()
    unwatched_movie_ids = [movie_id for movie_id in df.movieId.unique() if movie_id not in ui_list]        
    predictedL = []
    for movie_id in unwatched_movie_ids:     
        predicted = svd_algo.predict(ui, movie_id)
        predictedL.append((movie_id, predicted[3])) 
    pdf = pd.DataFrame(predictedL, columns = ['movieId', 'ratings'])
    pdf.sort_values('ratings', ascending=False, inplace=True)  
    pdf.set_index('movieId', inplace=True)    
    return pdf.head(10)        
    
# FastAPI endpoint to return the DataFrame as JSON
@router.get("/")
async def get_recommendations(user: User = Depends(current_user)):
    ui = user.id
    data = await get_user_movie_ratings()
    df = create_dataframe_from_data(data)
    svd_algo = load_svd_algo()
    top_10_predicitons = pred_user_rating(ui, df, svd_algo)
    recommendation_movie_ids = [movie_id for movie_id in top_10_predicitons.index]
    
    movies = [getMovieDetails(movieId) for movieId in recommendation_movie_ids]
    res = await asyncio.gather(*movies)
    
    return res