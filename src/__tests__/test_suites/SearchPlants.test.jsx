import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

describe('4th Deliverable', () => {
  const mockPlants = [
    { id: 1, name: "Aloe Vera", price: 15.99, inStock: true, image: "aloe.jpg" },
    { id: 2, name: "Snake Plant", price: 25.99, inStock: true, image: "snake.jpg" },
    { id: 3, name: "Fern", price: 12.99, inStock: true, image: "fern.jpg" },
  ];

  beforeEach(() => {
    if (global.setFetchResponse) {
      global.setFetchResponse(mockPlants);
    }
  });

  test('filters plants by name on search', async () => {
    render(<App />);
    
    // Wait for plants to load
    await waitFor(() => {
      expect(screen.getByText('Aloe Vera')).toBeInTheDocument();
    });
    
    // Find search input and type
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Snake' } });
    
    // Check filtered results
    await waitFor(() => {
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
      expect(screen.queryByText('Aloe Vera')).not.toBeInTheDocument();
      expect(screen.queryByText('Fern')).not.toBeInTheDocument();
    });
    
    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    
    // All plants should be visible again
    await waitFor(() => {
      expect(screen.getByText('Aloe Vera')).toBeInTheDocument();
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
      expect(screen.getByText('Fern')).toBeInTheDocument();
    });
  });
});