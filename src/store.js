import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pastriesApi } from './services/pastries.js'
import {authenticationApi} from "./services/authentication.js";
import user from "./services/user.js";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [pastriesApi.reducerPath]: pastriesApi.reducer,
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        user: user,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([pastriesApi.middleware, authenticationApi.middleware]),

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

