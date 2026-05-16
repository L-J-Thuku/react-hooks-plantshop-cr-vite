import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('1st Deliverable', () => {
  const mockPlants = [
    { id: 1, name: "Aloe Vera", price: 15.99, inStock: true, image: "aloe.jpg" },
    { id: 2, name: "Snake Plant", price: 25.99, inStock: true, image: "snake.jpg" },
  ];

  beforeEach(() => {
    // Reset fetch mock before each test
    if (global.resetFetchMock) global.resetFetchMock();
  });

  test('displays all plants on startup', async () => {
    // Set up the mock response
    if (global.setFetchResponse) {
      global.setFetchResponse(mockPlants);
    }

    render(<App />);

    // Wait for plants to load
    await waitFor(() => {
      expect(screen.getByText('Aloe Vera')).toBeInTheDocument();
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    });
  });

  test('plants aren\'t hardcoded', async () => {
    const differentPlants = [
      { id: 3, name: "Fern", price: 12.99, inStock: true, image: "fern.jpg" },
    ];

    if (global.setFetchResponse) {
      global.setFetchResponse(differentPlants);
    }

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Fern')).toBeInTheDocument();
      expect(screen.queryByText('Aloe Vera')).not.toBeInTheDocument();
    });
  });
});