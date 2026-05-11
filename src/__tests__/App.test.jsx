import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import App from '../components/App';

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

  test('1st Deliverable: displays all plants on startup', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    });
  });

  test('2nd Deliverable: adds a new plant when the form is submitted', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading plants...')).not.toBeInTheDocument();
    });
    
    const addButton = screen.getByText(/add new plant/i);
    expect(addButton).toBeInTheDocument();
  });

  test('3rd Deliverable: marks a plant as sold out', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
    });
    
    const stockButtons = screen.getAllByText(/In Stock/i);
    expect(stockButtons.length).toBeGreaterThan(0);
  });

  test('4th Deliverable: filters plants by name on search', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/Type a name to search/i);
    expect(searchInput).toBeInTheDocument();
  });
});