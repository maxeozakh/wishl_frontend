import React from 'react'
import { getByTestId, render } from '@testing-library/react'
import { App } from './App'
import * as useEncrypt from './features/crypto/useEncrypt'

describe('app', () => {
  jest.spyOn(useEncrypt, 'useEncrypt').mockImplementation(() => ({
    isGenerating: true,
    getEncrypted: () => null,
  }))

  test('renders app component', () => {
    const { container } = render(<App />)

    const element = getByTestId(container, 'app')

    expect(element).toBeTruthy()
  })
})
