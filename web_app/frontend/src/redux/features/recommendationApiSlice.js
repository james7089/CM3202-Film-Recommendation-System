import { apiSlice } from './apiSlice';

export const recommendationApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRecommendations: builder.query({
			query: () => ({
				url: '/recommendation',
				keepUnusedDataFor: 5,
			}),
		}),
	}),
});

export const { useLazyGetRecommendationsQuery } = recommendationApiSlice;
