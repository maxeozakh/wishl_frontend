import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../store'
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
    addWishList: (state, action: PayloadAction<WishInterface[]>) => {
      state.wishes = action.payload
    },
    removeWish: (state, action: PayloadAction<WishInterface>) => {
      state.wishes = state.wishes.filter((wish) => wish.id !== action.payload.id)
    },
  },
})

export const { addWish, addWishList, removeWish } = wishesSlice.actions

export const getWishes = (state: RootState) => state.wishList.wishes

export const wishesReducer = wishesSlice.reducer
