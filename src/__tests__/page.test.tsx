import { render, screen } from '@testing-library/react'

import ProductPage from '@/app/page'

describe('ProductPage', () => {
  it('should render product title', () => {
    render(<ProductPage />)
    expect(screen.getByText(/camiseta estilosa/i)).toBeInTheDocument()
  })

  it('should render color and size buttons', () => {
    render(<ProductPage />)

    expect(screen.getByText(/tamanho:/i)).toBeInTheDocument()
    expect(screen.getByText(/cor:/i)).toBeInTheDocument()
  })
})
