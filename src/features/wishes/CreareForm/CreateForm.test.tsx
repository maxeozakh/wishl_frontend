import React from 'react'
import { render, getByRole, screen } from '@testing-library/react'
import { CreateForm } from './CreateForm'

jest.mock('./UploadImage', () => {
  return {
    UploadImage: jest.fn(() => <div role="upload-image">Upload Image</div>),
  }
})

jest.mock('./useCreateForm', () => ({
  useCreateForm: jest.fn(() => ({
    formData: {
      title: 'o wow',
      description: 'mmm',
      id: '1',
    },
    setFormData: jest.fn(),
    handleAddWish: jest.fn(),
    handleUpload: jest.fn(),
    title: 'Create a wish',
  })),
}))

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
})
