import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock fetch globally
global.fetch = vi.fn()

// Base plants data for testing
global.basePlants = [
  { id: 1, name: "Monstera Deliciosa", image: "https://example.com/monstera.jpg", price: 45.99, isSoldOut: false },
  { id: 2, name: "Snake Plant", image: "https://example.com/snake.jpg", price: 25.99, isSoldOut: false },
  { id: 3, name: "Fiddle Leaf Fig", image: "https://example.com/fig.jpg", price: 65.99, isSoldOut: true }
]

// Helper to set fetch response
global.setFetchResponse = (data) => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => data,
  })
}

// Helper to set fetch error
global.setFetchError = () => {
  global.fetch.mockRejectedValue(new Error('Network error'))
}

// Helper to reset fetch
global.resetFetch = () => {
  global.fetch.mockReset()
}
