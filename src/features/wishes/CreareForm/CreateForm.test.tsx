import React from 'react'
import { render, getByRole, screen, fireEvent } from '@testing-library/react'
import { CreateForm } from './CreateForm'

jest.mock('../UploadImage/UploadImage', () => {
  return {
    UploadImage: jest.fn(() => <div role="upload-image">Upload Image</div>),
  }
})
const handleAddWishSpy = jest.fn()
const setFormDataSpy = jest.fn()
jest.mock('./useCreateForm', () => ({
  useCreateForm: jest.fn(() => ({
    formData: {
      title: 'o wow',
      description: 'mmm',
      id: '1',
    },
    setFormData: setFormDataSpy,
    handleAddWish: handleAddWishSpy,
    handleUpload: jest.fn(),
    title: 'Create a wish',
  })),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('CreateForm', () => {
  it('should render form', () => {
    const { container } = render(<CreateForm />)

    expect(getByRole(container, 'form')).toBeTruthy()
  })

  it('should render title', () => {
    const { container } = render(<CreateForm />)

    expect(getByRole(container, 'title')).toBeTruthy()
  })

  it('should render title with correct text', () => {
    const text = 'Create a wish'
    render(<CreateForm />)

    expect(screen.getByRole('title').textContent).toBe(text)
  })

  it('should render upload image component', () => {
    const { container } = render(<CreateForm />)

    expect(getByRole(container, 'upload-image')).toBeTruthy()
  })

  it('should render button', () => {
    const { container } = render(<CreateForm />)

    expect(getByRole(container, 'button')).toBeTruthy()
  })

  it('when button clicked handleAddWish should be called', () => {
    const { container } = render(<CreateForm />)

    getByRole(container, 'button').click()

    expect(handleAddWishSpy).toBeCalled()
  })

  it('when title input changed setFormData should be called', () => {
    const { container } = render(<CreateForm />)

    const input = getByRole(container, 'input-title')
    fireEvent.change(input, { target: { value: 'o wow' } })

    expect(setFormDataSpy).toBeCalled()
  })

  it('when title input changed setFormData should be called with correct arguments', () => {
    const { container } = render(<CreateForm />)

    const input = getByRole(container, 'input-title')
    fireEvent.change(input, { target: { value: 'o wowwowowo' } })

    expect(setFormDataSpy).toBeCalledWith({
      title: 'o wowwowowo',
      description: 'mmm',
      id: '1',
    })
  })
  it('when description input changed setFormData should be called', () => {
    const { container } = render(<CreateForm />)

    const input = getByRole(container, 'input-description')
    fireEvent.change(input, { target: { value: 'oh not really wow' } })

    expect(setFormDataSpy).toBeCalled()
  })

  it('when description input changed setFormData should be called with correct arguments', () => {
    const { container } = render(<CreateForm />)

    const input = getByRole(container, 'input-description')
    fireEvent.change(input, { target: { value: 'oh not really wow' } })

    expect(setFormDataSpy).toBeCalledWith({
      title: 'o wow',
      description: 'oh not really wow',
      id: '1',
    })
  })
})
