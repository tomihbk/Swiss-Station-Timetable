import { configureStore } from '@reduxjs/toolkit'
import tripReducer from './features/trip/tripSlice'
import apiReducer from './features/api/apiSlice'

export const store = configureStore({
    reducer: {
        trip : tripReducer,
        apiquery : apiReducer
    },
   /* middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: true,
   })*/
}
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch