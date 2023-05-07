import { apiSlice } from './apiSlice';

export const searchApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		search: builder.query({
			query: ({ mediaType, query, page }) => ({
				url: `/search/${mediaType}`,
                params: { query, page }
			}),
		}),
	}),
});

export const { useLazySearchQuery } = searchApiSlice;
