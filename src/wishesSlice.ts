import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WishInterface } from './Wish/Wish'

export interface WishesState {
  wishes: WishInterface[]
}

const initialState: WishesState = {
  wishes: [],
}

export const wishesSlice = createSlice({
  name: 'wishes',
  initialState,
  reducers: {
    addWish: (state, action: PayloadAction<WishInterface>) => {
      state.wishes.push(action.payload)
    },
    removeWish: (state, action: PayloadAction<WishInterface>) => {
      state.wishes = state.wishes.filter((wish) => wish.id !== action.payload.id)
    },
  },
})

export const { addWish, removeWish } = wishesSlice.actions

export const getWishes = (state: WishesState) => state.wishes

export const wishesReducer = wishesSlice.reducer
