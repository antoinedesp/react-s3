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
        orderedByQuantityPastries: builder.mutation({
            query: ({ offset, limit }) => ({
                url: `/api/pastries/order-quantity/${offset}/${limit}`,
                method: 'GET',
                credentials: "include",
            })
        }),
        paginatedPastries: builder.mutation({
            query: ({ offset, limit }) => ({
                url: `/api/pastries/${offset}/${limit}`,
                method: 'GET',
                credentials: "include",
            })
        }),
        addPastry: builder.mutation({
            query: ({
                        name,
                        quantity,
                        image,
                        choice
                    }) => ({
                url: `api/pastrie/`,
                method: 'POST',
                params: {
                    name: name,
                    quantity: quantity,
                    image: image,
                    choice: choice
                },
                credentials: "include",
            })
        }),
        editPastry: builder.mutation({
            query: ({
                id,
                name,
                quantity,
                image,
                choice
                }) => ({
                url: `api/pastrie/${id}`,
                method: 'PUT',
                params: {
                    name: name,
                    quantity: quantity,
                    image: image,
                    choice: choice
                },
                credentials: "include",
            })
        }),
        deletePastry: builder.mutation({
            query: (pastrieId) => ({
                url: `api/pastrie/${pastrieId}`,
                method: 'DELETE',
                credentials: "include",
            })
        }),
        searchPastry: builder.mutation({
            query: (pastrieKeyWord) => ({
                url: `/api/pastries-search/${pastrieKeyWord}`,
                method: 'GET',
                credentials: "include",
            })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const
    {
        useIsAuthenticatedMutation,
        useLogoutMutation,
        useLoginMutation,
        useOrderedByQuantityPastriesMutation,
        usePaginatedPastriesMutation,
        useAddPastryMutation,
        useEditPastryMutation,
        useDeletePastryMutation,
        useSearchPastryMutation
    } = authenticationApi

