import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('2nd Deliverable', () => {
  test('adds a new plant when the form is submitted', async () => {
    // Mock the initial GET request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(global.basePlants),
      })
    );
    
    // Mock the POST request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 4, name: 'Pothos', price: 12.99, inStock: true }),
      })
    );
    
    const { getByPlaceholderText, getByText, findAllByTestId } = render(<App />);
    
    // Wait for initial plants to load
    let plants = await findAllByTestId('plant-item');
    expect(plants).toHaveLength(3);
    
    // Fill out the form
    const nameInput = getByPlaceholderText('Plant name');
    const priceInput = getByPlaceholderText('Price');
    const submitButton = getByText('Add Plant');
    
    fireEvent.change(nameInput, { target: { value: 'Pothos' } });
    fireEvent.change(priceInput, { target: { value: '12.99' } });
    fireEvent.click(submitButton);
    
    // Wait for the new plant to appear
    await waitFor(async () => {
      plants = await findAllByTestId('plant-item');
      expect(plants).toHaveLength(4);
    });
  });
});