import { apiSlice } from './apiSlice';

export const watchListApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMovieWatchValue: builder.query({
			query: ({ movieId }) => ({
				url: `/rating/${movieId}`,
			}),
		}),
		setMovieWatchValue: builder.mutation({
			query: ({ movieId, newWatchValue }) => ({
				url: `/watch/${movieId}`,
				method: 'POST',
				params: { newWatchValue },
			}),
		}),
		deleteMovieWatchValue: builder.mutation({
			query: ({ movieId }) => ({
				url: `/watch/${movieId}`,
				method: 'DELETE',
			}),
		}),
        getWatchList: builder.query({
			query: () => ({
				url: '/watch/list/movies',
			}),
		}),
	}),
});

export const {
	useLazyGetMovieWatchValueQuery,
	useSetMovieWatchValueMutation,
	useDeleteMovieWatchValueMutation,
    useLazyGetWatchListQuery,
} = watchListApiSlice;
