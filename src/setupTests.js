import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

// Helper to set fetch response
global.setFetchResponse = (responseData) => {
  global.fetch.mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(responseData),
    })
  );
};

// Test data
global.basePlants = [
  { id: 1, name: "Monstera", species: "Monstera deliciosa", price: 25.99, inStock: true, image: "monstera.jpg" },
  { id: 2, name: "Snake Plant", species: "Sansevieria trifasciata", price: 19.99, inStock: true, image: "snake.jpg" },
  { id: 3, name: "Aloe Vera", species: "Aloe barbadensis", price: 15.99, inStock: true, image: "aloe.jpg" },
];

global.alternatePlants = [
  { id: 101, name: "Rose", species: "Rosa", price: 15.99, inStock: true, image: "rose.jpg" },
  { id: 102, name: "Tulip", species: "Tulipa", price: 12.99, inStock: true, image: "tulip.jpg" },
  { id: 103, name: "Orchid", species: "Orchidaceae", price: 35.99, inStock: true, image: "orchid.jpg" },
];

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Suppress console errors
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});