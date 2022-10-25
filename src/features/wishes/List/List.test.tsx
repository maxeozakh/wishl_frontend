import React from 'react'
import { getAllByTestId, getByTestId, render } from '@testing-library/react'
import { List } from './List'

const mockDispatch = jest.fn()
const mockSelector = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector(),
  useDispatch: () => mockDispatch(),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('List', () => {
  it('should render', () => {
    mockSelector.mockReturnValue([])
    const { container } = render(<List />)

    expect(getByTestId(container, 'wishes-list')).toBeTruthy()
  })

  it('should render wishes', () => {
    mockSelector.mockReturnValue([{}])

    const { container } = render(<List />)

    expect(getAllByTestId(container, 'wish')).toBeTruthy()
  })

  it('should render correct amount of wishes', () => {
    mockSelector.mockReturnValue([{}, {}])

    const { container } = render(<List />)

    expect(getAllByTestId(container, 'wish')).toHaveLength(2)
  })
})
