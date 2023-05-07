import { apiSlice } from './apiSlice';

export const ratingApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserRating: builder.query({
			query: ({movieId}) => ({
				url: `/rating/${movieId}`,
			}),
		}),
		setUserRating: builder.mutation({
			query: ({ movieId, newRating }) => ({
				url: `/rating/${movieId}`,
				method: 'POST',
				params: { newRating },
			}),
		}),
		getUserRated: builder.query({
			query: () => ({
				url: '/rating/rated/movies',
			}),
		}),
	}),
});

export const { useLazyGetUserRatingQuery, useSetUserRatingMutation, useLazyGetUserRatedQuery } =
	ratingApiSlice;
