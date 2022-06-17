import React from 'react'

export interface WishInterface {
  title: string
  id: string
  description?: string
  imageURL?: string
}

export const Wish: React.FC<WishInterface> = ({ title, description, imageURL }) => {
  return (
    <div data-testid="wish">
      <h3 data-testid="wish-title">{title}</h3>
      <p>{description}</p>

      {imageURL ? (
        <img src={imageURL} alt={title} />
      ) : (
        <img
          src={
            'http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/3cbb9a5db779562.png'
          }
          alt={title}
        />
      )}
    </div>
  )
}
