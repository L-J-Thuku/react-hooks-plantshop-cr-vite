import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../components/App';

// Extend expect with jest-dom matchers
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('Plant Shop Tests', () => {
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

  test('1st Deliverable: See all plants - displays all plants on page load', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    });
  });

  test('2nd Deliverable: Add a new plant', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading plants...')).not.toBeInTheDocument();
    });
    
    const addButton = screen.getByText(/add new plant/i);
    expect(addButton).toBeInTheDocument();
  });

  test('4th Deliverable: Search plants', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/Type a name to search/i);
    expect(searchInput).toBeInTheDocument();
  });
});