import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('3rd Deliverable', () => {
  test('marks a plant as sold out', async () => {
    global.setFetchResponse(global.basePlants);
    
    const { findAllByTestId, getByTestId } = render(<App />);
    
    // Wait for plants to load
    await waitFor(async () => {
      const plants = await findAllByTestId('plant-item');
      expect(plants).toHaveLength(3);
    });
    
    // Find Monstera's stock button (id=1)
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