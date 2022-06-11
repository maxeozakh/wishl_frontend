import React from 'react'
import { NewWishForm } from './NewWishForm/NewWishForm'
import { WishList } from './WishList/WishList'
export const App = () => {
  return (
    <div data-testid="app">
      <NewWishForm />
      <WishList />
    </div>
  )
}
