import { configureStore } from '@reduxjs/toolkit'
import { wishesReducer } from './src/wishesSlice'

export const store = configureStore({
  reducer: {
    wishes: wishesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch