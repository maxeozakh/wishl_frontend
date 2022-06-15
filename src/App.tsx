import React from 'react'
import { Download } from './Download'
import { NewWishForm } from './NewWishForm/NewWishForm'
import { ShareButton } from './ShareButton/ShareButton'
import { WishList } from './WishList/WishList'

export const App = () => {
  const params = new URLSearchParams(window.location.search)
  const key = window.location.hash.slice(1)
  const uid = params.get('i')

  return (
    <div className="app" data-testid="app">
      <NewWishForm />
      <WishList />
      <ShareButton />
      {uid && <Download uid={uid} keyForDecrypt={key} />}
    </div>
  )
}
