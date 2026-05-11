import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
afterEach(cleanup)

// Mock fetch globally
global.fetch = vi.fn()

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

// Reset fetch mock
global.resetFetch = () => {
  global.fetch.mockReset()
}