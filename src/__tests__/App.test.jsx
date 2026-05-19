import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import App from '../components/App';

describe('App', () => {
  const mockPlants = [
    { id: 1, name: 'Monstera', species: 'Monstera deliciosa', price: 25.99, inStock: true, image: 'monstera.jpg' },
    { id: 2, name: 'Snake Plant', species: 'Sansevieria', price: 19.99, inStock: true, image: 'snake.jpg' },
    { id: 3, name: 'Fiddle Leaf', species: 'Ficus lyrata', price: 45.99, inStock: false, image: 'fiddle.jpg' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  test('renders all plants on page load', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera')).toBeInTheDocument();
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
      expect(screen.getByText('Fiddle Leaf')).toBeInTheDocument();
    });
  });

  test('creates a new plant', async () => {
    const newPlant = { id: 4, name: 'Pothos', species: 'Epipremnum aureum', price: 12.99, inStock: true };
    
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPlants,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => newPlant,
      });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText('Plant name');
    const priceInput = screen.getByPlaceholderText('Price');
    
    fireEvent.change(nameInput, { target: { value: 'Pothos' } });
    fireEvent.change(priceInput, { target: { value: '12.99' } });
    
    const submitButton = screen.getByText('Add Plant');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Pothos')).toBeInTheDocument();
    });
  });

  test('toggles in stock status', async () => {
    const updatedPlant = { ...mockPlants[0], inStock: false };
    
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPlants,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => updatedPlant,
      });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera')).toBeInTheDocument();
    });

    const stockButton = screen.getByTestId('stock-button-1');
    fireEvent.click(stockButton);
    
    await waitFor(() => {
      expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    });
  });

  test('searches for plants', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlants,
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Monstera')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Monstera' } });
    
    expect(screen.getByText('Monstera')).toBeInTheDocument();
    expect(screen.queryByText('Snake Plant')).not.toBeInTheDocument();
  });
});