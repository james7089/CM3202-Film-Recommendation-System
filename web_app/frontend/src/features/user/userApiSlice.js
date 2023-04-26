import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => '/protected',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetUserQuery
} = userApiSlice