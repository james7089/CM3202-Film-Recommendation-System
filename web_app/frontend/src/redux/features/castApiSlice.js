import { apiSlice } from './apiSlice';

export const castApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDetail: builder.query({
			query: ({ personId }) => ({
				url: `/cast/${personId}`,
				keepUnusedDataFor: 5,
			}),
		}),
		getMovies: builder.query({
			query: ({ personId }) => ({
				url: `/cast/${personId}/movies`,
                keepUnusedDataFor: 5,
			}),
		}),
	}),
});

export const {
    useLazyGetDetailQuery,
    useLazyGetMoviesQuery,
} = castApiSlice;
