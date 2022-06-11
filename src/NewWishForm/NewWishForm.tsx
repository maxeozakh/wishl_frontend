import React, { useState } from 'react'
import { useWishes } from '../common/hooks/useWishes'

export const NewWishForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: null,
    description: null,
  })

  const { setWishes } = useWishes()

  return (
    <div>
      <h1>New Wish Form</h1>

      <input
        onChange={(event) => setFormData({ ...formData, title: event.target.value })}
        placeholder="title"
      ></input>
      <input
        onChange={(event) => setFormData({ ...formData, description: event.target.value })}
        placeholder="description"
      ></input>
      <button onClick={() => setWishes(formData)}>create</button>
    </div>
  )
}
