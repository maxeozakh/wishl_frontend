import { renderHook, act } from '@testing-library/react-hooks'
import { useUploadImage } from '../UploadImage/useUploadImage'

const requestSpy = jest.fn()
jest.mock('../../../common/useFetch', () => ({
  endpoints: {
    uploadImage: 'e endpoint',
  },
  useFetch: jest.fn(() => ({
    request: requestSpy,
    isFetching: false,
    data: {},
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
})
