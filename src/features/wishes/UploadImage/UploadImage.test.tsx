import { fireEvent, getByTestId, render } from '@testing-library/react'
import React from 'react'
import { UploadImage } from './UploadImage'

const mockDispatch = jest.fn()
const mockSelector = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector(),
  useDispatch: () => mockDispatch,
}))

let isFetchingMock = false
let imageURLMock: null | string = null
const setSelectedImageMock = jest.fn()
jest.mock('./useUploadImage', () => ({
  useUploadImage: () => ({
    isFetching: isFetchingMock,
    imageURL: imageURLMock,
    setSelectedImage: setSelectedImageMock,
  }),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('UploadImage', () => {
  it('should render', () => {
    const { container } = render(<UploadImage handleUpload={jest.fn} />)

    expect(getByTestId(container, 'upload-image')).toBeTruthy()
  })

  it('should render loader if isFetching is true', () => {
    isFetchingMock = true

    const { container } = render(<UploadImage handleUpload={jest.fn} />)

    expect(getByTestId(container, 'upload-image-loader')).toBeTruthy()
  })

  it('should render image if imageURL is presented', () => {
    isFetchingMock = false
    imageURLMock = 'some url'

    const { container } = render(<UploadImage handleUpload={jest.fn} />)

    expect(getByTestId(container, 'upload-image-img')).toBeTruthy()
  })

  it('should render image with correct src if imageURL is presented', () => {
    isFetchingMock = false
    imageURLMock = 'some url 4000'

    const { container } = render(<UploadImage handleUpload={jest.fn} />)

    expect(getByTestId(container, 'upload-image-img').getAttribute('src')).toBe('some url 4000')
  })

  it('should render input', () => {
    const { container } = render(<UploadImage handleUpload={jest.fn} />)

    expect(getByTestId(container, 'upload-image-input')).toBeTruthy()
  })

  it('should call setSelectedImage if input change with files', () => {
    const { container } = render(<UploadImage handleUpload={jest.fn} />)

    fireEvent.change(getByTestId(container, 'upload-image-input'), {
      target: { files: [new File([], 'image.png')] },
    })

    expect(setSelectedImageMock).toBeCalled()
  })
  it('shouldnt call setSelectedImage if input change without files', () => {
    const { container } = render(<UploadImage handleUpload={jest.fn} />)

    fireEvent.change(getByTestId(container, 'upload-image-input'), {
      target: { files: null },
    })

    expect(setSelectedImageMock).not.toBeCalled()
  })
})
