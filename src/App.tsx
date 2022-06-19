import React from 'react'
import { Loader } from './features/loader/Loader'
import { CreateForm } from './features/wishes/CreareForm/CreateForm'
import { Download } from './features/wishes/Download'
import { List } from './features/wishes/List/List'
import { ShareButton } from './features/wishes/ShareButton/ShareButton'


export const App = () => {
  const params = new URLSearchParams(window.location.search)
  const key = window.location.hash.slice(1)
  const uid = params.get('i')

  return (
    <div className="app" data-testid="app">
      <CreateForm />
      <List />
      <ShareButton />
      <Loader />
      {uid && <Download uid={uid} keyForDecrypt={key} />}
    </div>
  )
}
