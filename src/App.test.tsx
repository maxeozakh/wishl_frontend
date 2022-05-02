import React from 'react'
import { getByTestId, render } from '@testing-library/react'
import { App } from './App'
describe('app', () => {
  test('renders app component', () => {
    const { container } = render(<App />)

    const element = getByTestId(container, 'app')

    expect(element).toBeTruthy()
  })
})
