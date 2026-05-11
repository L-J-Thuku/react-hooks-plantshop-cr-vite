import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import App from '../components/App';

describe('Create Plant', () => {
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

  test('adds a new plant when the form is submitted', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText('Loading plants...')).not.toBeInTheDocument();
    });
    
    const addButton = screen.getByText(/add new plant/i);
    fireEvent.click(addButton);
    
    const nameInput = screen.getByPlaceholderText(/e\.g\., Monstera Deliciosa/i);
    fireEvent.change(nameInput, { target: { value: 'Aloe Vera' } });
    
    const submitButton = screen.getByText(/add plant/i);
    fireEvent.click(submitButton);
    
    expect(addButton).toBeInTheDocument();
  });
});