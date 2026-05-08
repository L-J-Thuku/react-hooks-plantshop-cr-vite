import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../components/App'

describe('4th Deliverable: Search plants', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    global.fetch = vi.fn()
  })

  it('filters plants by name on search', async () => {
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
      const snakeElements = screen.getAllByText(/Snake Plant/i)
      expect(snakeElements.length).toBeGreaterThan(0)
    })

    // Find search input
    const searchInput = screen.getByPlaceholderText(/type a name to search/i)
    
    // Type "Monstera" in search
    await act(async () => {
      await userEvent.type(searchInput, 'Monstera')
    })

    // Should only show Monstera
    await waitFor(() => {
      const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
      expect(monsteraElements.length).toBeGreaterThan(0)
      const snakeElements = screen.queryAllByText(/Snake Plant/i)
      expect(snakeElements.length).toBe(0)
    })

    // Clear search
    await act(async () => {
      await userEvent.clear(searchInput)
    })

    // Should show all plants again
    await waitFor(() => {
      const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
      expect(monsteraElements.length).toBeGreaterThan(0)
      const snakeElements = screen.getAllByText(/Snake Plant/i)
      expect(snakeElements.length).toBeGreaterThan(0)
    })
  })
})