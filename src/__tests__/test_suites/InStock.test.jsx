import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import App from '../../components/App'

describe('3rd Deliverable: Mark plant as sold out', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    global.fetch = vi.fn()
  })

  it('marks a plant as sold out', async () => {
    const mockPlants = [
      { id: 1, name: "Monstera Deliciosa", price: 45.99, isSoldOut: false },
      { id: 2, name: "Snake Plant", price: 25.99, isSoldOut: false },
    ]
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    })

    await act(async () => {
      render(<App />)
    })
    
    // Wait for plants to load
    await waitFor(() => {
      const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
      expect(monsteraElements.length).toBeGreaterThan(0)
    })

    // Find and click the "Add to Cart" button for the first plant
    const addToCartButtons = screen.getAllByText(/add to cart/i)
    expect(addToCartButtons.length).toBeGreaterThan(0)
    
    await act(async () => {
      fireEvent.click(addToCartButtons[0])
    })

    // Button should change to "Restock"
    await waitFor(() => {
      const restockButtons = screen.getAllByText(/restock/i)
      expect(restockButtons.length).toBeGreaterThan(0)
    })
  })
})