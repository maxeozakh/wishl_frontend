import React from 'react'

export interface IWish {
  title: string
  description?: string
  imageURL?: string
}

export const Wish: React.FC<IWish> = ({ title, description, imageURL }) => {
  return (
    <div data-testid="wish">
      <h3 data-testid="wish-title">{title}</h3>
      <p>{description}</p>
      {imageURL && <img src={imageURL} alt={title} />}
    </div>
  )
}
