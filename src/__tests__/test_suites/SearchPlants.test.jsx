import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('4th Deliverable', () => {
  test('filters plants by name on search', async () => {
    global.setFetchResponse(global.basePlants);
    const { getByTestId, findAllByTestId } = render(<App />);
    
    // Wait for plants to load
    let plantItems = await findAllByTestId('plant-item', {}, { timeout: 3000 });
    expect(plantItems.length).toBe(3);
    
    // Get search input
    const searchInput = getByTestId('search-input');
    
    // Search for 'Aloe'
    fireEvent.change(searchInput, { target: { value: 'Aloe' } });
    
    // Check filtered results
    await waitFor(async () => {
      const filteredPlants = await findAllByTestId('plant-item');
      expect(filteredPlants.length).toBe(1);
      const plantName = filteredPlants[0].querySelector('h3').textContent;
      expect(plantName).toBe('Aloe Vera');
    });
    
    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    
    // Verify all plants return
    await waitFor(async () => {
      const allPlants = await findAllByTestId('plant-item');
      expect(allPlants.length).toBe(3);
    });
  });
});