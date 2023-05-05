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
	}),
});

export const { useLazyGetUserRatingQuery, useSetUserRatingMutation } =
	ratingApiSlice;
