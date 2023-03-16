import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
import os
import matplotlib.pyplot as plt 

#creating paths to csv files in '../MovieLensDataset/' directory
movies_path = os.path.join(os.pardir, 'MovieLensDataset', 'movies.csv')
ratings_path = os.path.join(os.pardir, 'MovieLensDataset', 'ratings.csv')
tags_path = os.path.join(os.pardir, 'MovieLensDataset', 'tags.csv')

#reading each file and turning into dataframe
movies = pd.read_csv(movies_path)
ratings = pd.read_csv(ratings_path)
tags = pd.read_csv(tags_path)

# map movie to id:
Mapping_file = dict(zip(movies.title.tolist(), movies.movieId.tolist()))

#remove '|' in genres
movies['genres'] = movies['genres'].str.replace('|',' ')

#create dataframe with tags merged onto movies
movies_tags = pd.merge(movies, tags, on='movieId', how='left')

movies_tags.fillna("", inplace=True)
movies_tags = pd.DataFrame(movies_tags.groupby('movieId')['tag'].apply( lambda x: "%s" % ' '.join(x)))
movies_metadata = pd.merge(movies, movies_tags, on='movieId', how='left')
movies_metadata ['metadata'] = movies_metadata[['tag', 'genres']].apply( lambda x: ' '.join(x), axis = 1)
#print(movies_metadata[['movieId','title','metadata']].head(3))

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movies_metadata['metadata'])
tfidf_df = pd.DataFrame(tfidf_matrix.toarray(), index=movies_metadata.index.tolist())
#print(tfidf_df.shape)

# Compress with SVD

svd = TruncatedSVD(n_components=200)
latent_matrix = svd.fit_transform(tfidf_df)
#plot var expalined to see what latent dimensions to use
explained = svd.explained_variance_ratio_.cumsum()
plt.plot(explained, '.-', ms = 16, color='red')
plt.xlabel('Singular value components', fontsize= 12)
plt.ylabel('Cumulative percent of variance', fontsize=12)        
plt.show()

#number of latent dimensions to keep
n = 200 
latent_matrix_1_df = pd.DataFrame(latent_matrix[:,0:n], index=movies_metadata.title.tolist())

# our content latent matrix:
print(latent_matrix_1_df.shape)


# # Break up the big genre string into a string array
# movies['genres'] = movies['genres'].str.split(' ')
# # Convert genres to string value
# movies['genres'] = movies['genres'].fillna("").astype('str')

# print(movies['genres'])