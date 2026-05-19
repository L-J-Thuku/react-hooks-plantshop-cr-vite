import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('3rd Deliverable', () => {
  test('marks a plant as sold out', async () => {
    global.setFetchResponse(global.basePlants);
    
    const { findAllByTestId, getByTestId } = render(<App />);
    
    // Wait for plants to load
    await findAllByTestId('plant-item', {}, { timeout: 3000 });
    
    // Find Monstera's button (id=1)
    const stockButton = getByTestId('stock-button-1');
    expect(stockButton.textContent).toBe('In Stock');
    
    // Click to toggle
    fireEvent.click(stockButton);
    
    // Verify text changed
    await waitFor(() => {
      expect(stockButton.textContent).toBe('Out of Stock');
    });
  });
});