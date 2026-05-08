import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../components/App'

describe('Plant Shop Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    global.fetch = vi.fn()
  })

  describe('1st Deliverable: See all plants', () => {
    it('displays all plants on page load', async () => {
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
      
      await waitFor(() => {
        const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
        expect(monsteraElements.length).toBeGreaterThan(0)
        const snakeElements = screen.getAllByText(/Snake Plant/i)
        expect(snakeElements.length).toBeGreaterThan(0)
      })
    })
  })

  describe('2nd Deliverable: Add a new plant', () => {
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
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => initialPlants,
      })
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => newPlant
      })

      await act(async () => {
        render(<App />)
      })
      
      await waitFor(() => {
        const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
        expect(monsteraElements.length).toBeGreaterThan(0)
      })

      const addButton = screen.getByText(/add new plant/i)
      await act(async () => {
        fireEvent.click(addButton)
      })

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

      await waitFor(() => {
        const aloeElements = screen.getAllByText(/Aloe Vera/i)
        expect(aloeElements.length).toBeGreaterThan(0)
      })
    })
  })

  describe('4th Deliverable: Search plants', () => {
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
      
      await waitFor(() => {
        const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
        expect(monsteraElements.length).toBeGreaterThan(0)
      })

      const searchInput = screen.getByPlaceholderText(/search/i)
      
      await act(async () => {
        await userEvent.type(searchInput, 'Monstera')
      })

      await waitFor(() => {
        const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
        expect(monsteraElements.length).toBeGreaterThan(0)
        const snakeElements = screen.queryAllByText(/Snake Plant/i)
        expect(snakeElements.length).toBe(0)
      })

      await act(async () => {
        await userEvent.clear(searchInput)
      })

      await waitFor(() => {
        const monsteraElements = screen.getAllByText(/Monstera Deliciosa/i)
        expect(monsteraElements.length).toBeGreaterThan(0)
        const snakeElements = screen.getAllByText(/Snake Plant/i)
        expect(snakeElements.length).toBeGreaterThan(0)
      })
    })
  })
})