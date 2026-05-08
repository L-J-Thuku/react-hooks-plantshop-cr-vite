import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../components/App'

describe('2nd Deliverable: Add a new plant', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    global.fetch = vi.fn()
  })

  it('adds a new plant when the form is submitted', async () => {
    const initialPlants = [
      { id: 1, name: "Monstera Deliciosa", price: 45.99, isSoldOut: false },
    ]
    
    const newPlant = { 
      id: 2, 
      name: "Aloe Vera", 
      image: "https://example.com/aloe.jpg", 
      price: 19.99, 
      isSoldOut: false 
    }
    
    // First fetch for initial load
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => initialPlants,
    })
    
    // Mock POST request
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newPlant
    })

    await act(async () => {
      render(<App />)
    })
    
    // Wait for initial plants to load - use getAllByText
    await waitFor(() => {
      const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
      expect(monsteraElements.length).toBeGreaterThan(0)
    })

    // Find and click the add plant button
    const addButton = screen.getByText(/add new plant/i)
    await act(async () => {
      fireEvent.click(addButton)
    })

    // Fill out the form
    const nameInput = screen.getByPlaceholderText(/e\.g\., Monstera Deliciosa/i)
    const priceInput = screen.getByPlaceholderText(/45.99/i)
    const submitButton = screen.getByText(/add plant/i)

    await act(async () => {
      await userEvent.type(nameInput, 'Aloe Vera')
      await userEvent.type(priceInput, '19.99')
    })
    
    await act(async () => {
      fireEvent.click(submitButton)
    })

    // Verify the new plant appears
    await waitFor(() => {
      const aloeElements = screen.getAllByText(/Aloe Vera/i)
      expect(aloeElements.length).toBeGreaterThan(0)
    })
  })
})