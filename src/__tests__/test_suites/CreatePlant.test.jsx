import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('2nd Deliverable', () => {
  test('adds a new plant when the form is submitted', async () => {
    vi.clearAllMocks();
    
    // Mock GET request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(global.basePlants),
      })
    );
    
    // Mock POST request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 4, name: 'Pothos', price: '12.99', inStock: true }),
      })
    );
    
    const { getByPlaceholderText, getByText, findAllByTestId } = render(<App />);
    
    // Wait for plants to load
    await findAllByTestId('plant-item', {}, { timeout: 3000 });
    
    // Fill form
    fireEvent.change(getByPlaceholderText('Plant name'), { target: { value: 'Pothos' } });
    fireEvent.change(getByPlaceholderText('Price'), { target: { value: '12.99' } });
    fireEvent.click(getByText('Add Plant'));
    
    // Verify POST request
    expect(global.fetch).toHaveBeenLastCalledWith('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Pothos', image: '', price: '12.99' }),
    });
    
    // Wait for new plant to appear
    await waitFor(async () => {
      const plants = await findAllByTestId('plant-item');
      expect(plants.length).toBe(4);
    });
  });
});