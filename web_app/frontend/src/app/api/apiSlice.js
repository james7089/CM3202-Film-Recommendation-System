import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    
    if (result?.error?.status === 422) {
        console.log('sending refresh token')
        // send refresh token to get new acces token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        
        if (refreshResult?.data) {
            const email = api.getState().auth.email
            const accessToken = refreshResult.data
            // store the new token
            api.dispatch(setCredentials( { email, accessToken }))
            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})