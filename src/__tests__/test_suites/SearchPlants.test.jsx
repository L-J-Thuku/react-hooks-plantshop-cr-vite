import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('4th Deliverable', () => {
  test('filters plants by name on search', async () => {
    // Mock the initial GET request
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(global.basePlants),
      })
    );
    
    const { getByTestId, findAllByTestId } = render(<App />);
    
    // Wait for plants to load
    let plantItems = await findAllByTestId('plant-item');
    expect(plantItems).toHaveLength(3);
    
    // Search for a plant
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Aloe' } });
    
    // Wait for filter to apply
    await waitFor(async () => {
      const filteredPlants = await findAllByTestId('plant-item');
      expect(filteredPlants).toHaveLength(1);
    });
    
    // Clear search and verify all plants return
    fireEvent.change(searchInput, { target: { value: '' } });
    
    await waitFor(async () => {
      const allPlants = await findAllByTestId('plant-item');
      expect(allPlants).toHaveLength(3);
    });
  });
});