import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import App from '../../components/App'

describe('1st Deliverable: See all plants on page load', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    global.fetch = vi.fn()
  })

  it('displays all plants on startup', async () => {
    const mockPlants = [
      { id: 1, name: "Monstera Deliciosa", price: 45.99, isSoldOut: false },
      { id: 2, name: "Snake Plant", price: 25.99, isSoldOut: false },
      { id: 3, name: "Fiddle Leaf Fig", price: 65.99, isSoldOut: true },
    ]
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    })

    await act(async () => {
      render(<App />)
    })
    
    await waitFor(() => {
      // Use getAllByText because the name appears in multiple places
      const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
      expect(monsteraElements.length).toBeGreaterThan(0)
      
      const snakeElements = screen.getAllByText(/Snake Plant/i)
      expect(snakeElements.length).toBeGreaterThan(0)
      
      const fiddleElements = screen.getAllByText(/Fiddle Leaf Fig/i)
      expect(fiddleElements.length).toBeGreaterThan(0)
    })
  })

  it('plants arent hardcoded', async () => {
    const mockPlants = [
      { id: 1, name: "Unique Plant Name", price: 45.99, isSoldOut: false },
    ]
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    })

    await act(async () => {
      render(<App />)
    })
    
    await waitFor(() => {
      const plantElements = screen.getAllByText(/Unique Plant Name/i)
      expect(plantElements.length).toBeGreaterThan(0)
    })
    
    // Check that there's a plant-item element
    const plantItems = screen.getAllByTestId('plant-item')
    expect(plantItems.length).toBeGreaterThan(0)
  })
})