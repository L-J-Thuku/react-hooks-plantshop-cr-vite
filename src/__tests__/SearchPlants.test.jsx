import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import App from '../components/App';

describe('Search Plants', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, name: "Monstera Deliciosa", image: "https://example.com/monstera.jpg", price: 45.99, inStock: true },
          { id: 2, name: "Snake Plant", image: "https://example.com/snake.jpg", price: 25.99, inStock: true }
        ]),
        ok: true,
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('filters plants by name on search', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/Type a name to search/i);
    fireEvent.change(searchInput, { target: { value: 'Monstera' } });
    
    await waitFor(() => {
      expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
    });
  });
});