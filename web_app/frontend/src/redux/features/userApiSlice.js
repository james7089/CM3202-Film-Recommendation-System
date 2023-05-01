import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => '/user',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetUserQuery
} = userApiSlice