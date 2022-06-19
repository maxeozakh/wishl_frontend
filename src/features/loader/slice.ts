import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../store'

export interface LoaderState {
  isLoading: boolean
}

const initialState: LoaderState = {
  isLoading: false,
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setIsLoading } = loaderSlice.actions

export const getIsLoading = (state: RootState) => state.loader.isLoading

export const loaderReducer = loaderSlice.reducer
