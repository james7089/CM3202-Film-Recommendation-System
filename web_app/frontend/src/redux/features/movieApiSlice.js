import { apiSlice } from './apiSlice';

export const movieApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getGenres: builder.query({
			query: () => '/movie/genres',
			keepUnusedDataFor: 5,
		}),
		getLists: builder.query({
			query: ({ movieCategory, page }) => ({
				url: `/movie/${movieCategory}`,
				params: { page },
			}),
		}),
	}),
});

export const { useGetGenresQuery, useLazyGetListsQuery } = movieApiSlice;
