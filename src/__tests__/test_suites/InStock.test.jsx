import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('3rd Deliverable', () => {
  test('marks a plant as sold out', async () => {
    // Setup initial plants
    const initialPlants = [
      { id: 1, name: "Monstera", species: "Monstera deliciosa", price: 25.99, inStock: true, image: "monstera.jpg" },
      { id: 2, name: "Snake Plant", species: "Sansevieria trifasciata", price: 19.99, inStock: true, image: "snake.jpg" },
      { id: 3, name: "Aloe Vera", species: "Aloe barbadensis", price: 15.99, inStock: true, image: "aloe.jpg" },
    ];
    
    // Setup updated plant after PATCH
    const updatedPlant = { ...initialPlants[0], inStock: false };
    
    // Mock the initial GET request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(initialPlants),
      })
    );
    
    // Mock the PATCH request for toggling stock
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedPlant),
      })
    );
    
    const { findAllByTestId, getByTestId, queryByText } = render(<App />);
    
    // Wait for plants to load
    await findAllByTestId('plant-item');
    
    // Get the first plant's stock button (Monstera)
    const stockButton = getByTestId('stock-button-1');
    expect(stockButton).toHaveTextContent('In Stock');
    
    // Click the button to mark as sold out
    fireEvent.click(stockButton);
    
    // Wait for and verify the button text changed to "Out of Stock"
    await waitFor(() => {
      expect(stockButton).toHaveTextContent('Out of Stock');
    });
  });
});