import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Make expect globally available
global.expect = expect

// Mock fetch globally
global.setFetchResponse = (data) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
    status: 200,
    headers: new Headers(),
  })
}

global.setPostFetchResponse = (data) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
    status: 201,
    headers: new Headers(),
  })
}

global.resetFetchMock = () => {
  global.fetch = vi.fn()
}

// Set default empty response
global.setFetchResponse([])