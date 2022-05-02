import React from 'react'
import { getByTestId, render, screen } from '@testing-library/react'
import { Wish } from './Wish'
describe('Wish', () => {
  test('renders component', () => {
    const { container } = render(<Wish title="first wish ever" />)

    expect(getByTestId(container, 'wish')).toBeTruthy()
  })

  test('render title', () => {
    const { container } = render(<Wish title="first wish ever" />)

    expect(getByTestId(container, 'wish-title'))
  })

  test('title contain correct text', () => {
    const text = 'first wish ever'
    render(<Wish title={text} />)

    expect(screen.getByTestId('wish-title').textContent).toBe(text)
  })
})
