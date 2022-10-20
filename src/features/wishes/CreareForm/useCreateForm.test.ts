import { act, renderHook } from '@testing-library/react-hooks'
import { useCreateForm } from './useCreateForm'

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockReturnValue('123'),
}))

const mockDispatch = jest.fn()
let mockSelector = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector(),
  useDispatch: () => mockDispatch,
}))

const setSelectorValue = (value: any) => {
  mockSelector = jest.fn().mockReturnValue(value)
}
afterEach(() => {
  jest.clearAllMocks()
})

describe('useCreateForm', () => {
  it('should return defautl state of form with a title, description and id', () => {
    setSelectorValue([])

    const { result } = renderHook(() => useCreateForm())

    expect(result.current.formData).toEqual({
      title: null,
      description: null,
      id: '123',
    })
  })

  it('setForm should update the form', () => {
    const { result } = renderHook(() => useCreateForm())

    act(() => {
      result.current.setFormData({
        title: 'My wish',
        description: 'My wish description',
        id: '123',
      })
    })

    expect(result.current.formData).toEqual({
      title: 'My wish',
      description: 'My wish description',
      id: '123',
    })
  })

  it('handleUpload should update the form with the uploaded image', () => {
    const { result } = renderHook(() => useCreateForm())

    act(() => {
      result.current.handleUpload('my-image.png')
    })

    expect(result.current.formData).toEqual({
      title: null,
      description: null,
      id: '123',
      imageURL: 'my-image.png',
    })
  })
  it('return correct title when has wishes', () => {
    setSelectorValue([{ id: '123' }])
    const { result } = renderHook(() => useCreateForm())

    expect(result.current.title).toBe('your wishlist ✨')
  })
  it('return correct title when no wishes presented', () => {
    setSelectorValue([])
    const { result } = renderHook(() => useCreateForm())

    expect(result.current.title).toBe('add something to your wishlist ✨')
  })

  it('handleAddWish should dispatch addWish action', () => {
    const { result } = renderHook(() => useCreateForm())

    act(() => {
      result.current.handleAddWish()
    })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'wishes/addWish',
      payload: {
        title: null,
        description: null,
        id: '123',
      },
    })
  })

  it('handleAddWish should dispatch action with correct payload', async () => {
    const { result } = renderHook(() => useCreateForm())

    act(() => {
      result.current.setFormData({
        title: 'My second wish',
        description: 'My wish description',
        id: '123',
      })
    })
    act(() => {
      result.current.handleAddWish()
    })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'wishes/addWish',
      payload: {
        title: 'My second wish',
        description: 'My wish description',
        id: '123',
      },
    })
  })
})
