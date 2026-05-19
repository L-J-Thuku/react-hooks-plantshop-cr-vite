import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('2nd Deliverable', () => {
  test('adds a new plant when the form is submitted', async () => {
    // Clear any previous mocks
    vi.clearAllMocks();
    
    // Mock the initial GET request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(global.basePlants),
      })
    );
    
    // Mock the POST request - price should be a string
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 4, name: 'Pothos', price: 12.99, inStock: true }),
      })
    );
    
    const { getByPlaceholderText, getByText, findAllByTestId } = render(<App />);
    
    // Wait for initial plants to load
    await waitFor(async () => {
      const plants = await findAllByTestId('plant-item');
      expect(plants).toHaveLength(3);
    });
    
    // Fill out the form
    const nameInput = getByPlaceholderText('Plant name');
    const priceInput = getByPlaceholderText('Price');
    const submitButton = getByText('Add Plant');
    
    fireEvent.change(nameInput, { target: { value: 'Pothos' } });
    fireEvent.change(priceInput, { target: { value: '12.99' } });
    fireEvent.click(submitButton);
    
    // Check that fetch was called with the right arguments
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Pothos', image: '', price: '12.99' }),
    });
    
    // Wait for the new plant to appear
    await waitFor(async () => {
      const plants = await findAllByTestId('plant-item');
      expect(plants).toHaveLength(4);
    });
  });
});