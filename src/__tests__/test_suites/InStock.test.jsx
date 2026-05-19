import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('3rd Deliverable', () => {
  test('marks a plant as sold out', async () => {
    // Mock the initial GET request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(global.basePlants),
      })
    );
    
    // Mock the PATCH request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, inStock: false }),
      })
    );
    
    const { findAllByTestId, getByTestId } = render(<App />);
    
    // Wait for plants to load
    await findAllByTestId('plant-item');
    
    // Find the first plant's stock button (Monstera)
    const stockButton = getByTestId('stock-button-1');
    expect(stockButton.textContent).toBe('In Stock');
    
    // Click to mark as sold out
    fireEvent.click(stockButton);
    
    // Wait for the button text to change
    await waitFor(() => {
      expect(stockButton.textContent).toBe('Out of Stock');
    });
  });
});