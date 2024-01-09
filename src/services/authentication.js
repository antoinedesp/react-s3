// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authenticationApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data,
                credentials: "include",
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'GET',
                credentials: "include",
            })
        }),
        isAuthenticated: builder.mutation({
            query: () => ({
                url: 'me',
                method: 'GET',
                credentials: "include",
            })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useIsAuthenticatedMutation, useLogoutMutation, useLoginMutation } = authenticationApi

