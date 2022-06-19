import { configureStore } from '@reduxjs/toolkit'
import { loaderReducer } from './src/features/loader/slice'
import { wishesReducer } from './src/features/wishes/slice'

export const store = configureStore({
  reducer: {
    wishList: wishesReducer,
    loader: loaderReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch