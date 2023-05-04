import { apiSlice } from './apiSlice';

export const movieApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getGenres: builder.query({
			query: () => '/movie/genres',
			keepUnusedDataFor: 5,
		}),
		getList: builder.query({
			query: ({ movieCategory, page }) => ({
				url: `/movie/${movieCategory}`,
				params: { page },
				keepUnusedDataFor: 5,
			}),
		}),
		getDetails: builder.query({
			query: ({ movieId }) => ({
				url: `/movie/details/${movieId}`,
				keepUnusedDataFor: 5,
			}),
		}),
	}),
});

export const {
	useGetGenresQuery,
	useLazyGetListQuery,
	useLazyGetDetailsQuery,
} = movieApiSlice;
