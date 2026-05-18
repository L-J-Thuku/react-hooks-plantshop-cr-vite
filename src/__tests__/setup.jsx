// src/__tests__/setup.jsx
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';

// Mock fetch globally
const originalFetch = global.fetch;

// Set up the mock fetch response function
global.setFetchResponse = (responseData) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => responseData,
  });
};

// Reset fetch mock before each test
beforeAll(() => {
  // Set up default plants data that tests expect
  global.basePlants = [
    { id: 1, name: "Aloe", price: 15.99, isInStock: true, image: "aloe.jpg" },
    { id: 2, name: "Fern", price: 12.99, isInStock: true, image: "fern.jpg" },
    { id: 3, name: "Cactus", price: 9.99, isInStock: false, image: "cactus.jpg" },
  ];
  
  global.alternatePlants = [
    { id: 4, name: "Orchid", price: 25.99, isInStock: true, image: "orchid.jpg" },
    { id: 5, name: "Snake Plant", price: 19.99, isInStock: true, image: "snake.jpg" },
  ];
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Clean up after all tests
afterAll(() => {
  global.fetch = originalFetch;
  delete global.setFetchResponse;
});