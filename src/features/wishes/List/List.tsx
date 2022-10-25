import React from 'react'
import { useSelector } from 'react-redux'
import { getWishes } from '../slice'
import { Wish } from '../Wish/Wish'


export const List: React.FC = () => {
  const wishes = useSelector(getWishes)

  return (
    <div data-testid="wishes-list">
      {wishes.map((wish, i) => {
        const { title, description, imageURL, id } = wish
        return <Wish id={id} key={i} title={title} description={description} imageURL={imageURL} />
      })}
    </div>
  )
}
