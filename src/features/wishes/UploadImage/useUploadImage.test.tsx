import { renderHook, act } from '@testing-library/react-hooks'
import { useUploadImage } from '../UploadImage/useUploadImage'

const requestSpy = jest.fn()

let dataMock: null | Record<string, string> = null
const isFetchingMock = false
jest.mock('../../../common/useFetch', () => ({
  endpoints: {
    uploadImage: 'e endpoint',
  },
  useFetch: jest.fn(() => ({
    request: requestSpy,
    isFetching: isFetchingMock,
    data: dataMock,
  })),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useUploadImage', () => {
  it('should call request if selectedImage is presented', () => {
    const handleUpload = jest.fn()
    const { result } = renderHook(() => useUploadImage(handleUpload))

    act(() => {
      result.current.setSelectedImage(new File([], 'image.png'))
    })

    expect(requestSpy).toBeCalled()
  })
  it('should call request with correct arguments if selectedImage is presented', () => {
    const handleUpload = jest.fn()
    const formData = new FormData()
    formData.append('file', new File([], 'image.png'))
    const { result } = renderHook(() => useUploadImage(handleUpload))

    act(() => {
      result.current.setSelectedImage(new File([], 'image.png'))
    })

    expect(requestSpy).toBeCalledWith('e endpoint', 'POST', formData, {})
  })

  it('shouldnt call request if selectedImage is not presented', () => {
    const handleUpload = jest.fn()
    const { result } = renderHook(() => useUploadImage(handleUpload))

    act(() => {
      result.current.setSelectedImage(null)
    })

    expect(requestSpy).not.toBeCalled()
  })

  it('should call handleUpload if data from request is presented', () => {
    dataMock = { something: '1' }
    const handleUpload = jest.fn()

    renderHook(() => useUploadImage(handleUpload))

    expect(handleUpload).toBeCalled()
  })
  it('should call handleUpload with correct arguments if data from request is presented', () => {
    dataMock = { url: 'yes' }
    const handleUpload = jest.fn()

    renderHook(() => useUploadImage(handleUpload))

    expect(handleUpload).toHaveBeenCalledWith('yes')
  })

  it('should return correct imageURL if data from request was presented', () => {
    dataMock = { url: 'yes' }
    const handleUpload = jest.fn()

    const { result } = renderHook(() => useUploadImage(handleUpload))

    expect(result.current.imageURL).toBe('yes')
  })
})
