import { apiSlice } from './apiSlice';

export const personApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDetail: builder.query({
			query: ({ personId }) => ({
				url: `/person/${personId}`,
				keepUnusedDataFor: 5,
			}),
		}),
		getMovies: builder.query({
			query: ({ personId }) => ({
				url: `/person/${personId}/movies`,
                keepUnusedDataFor: 5,
			}),
		}),
	}),
});

export const {
    useLazyGetDetailQuery,
    useLazyGetMoviesQuery,
} = personApiSlice;
