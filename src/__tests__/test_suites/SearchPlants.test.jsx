import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('4th Deliverable', () => {
  test('filters plants by name on search', async () => {
    global.setFetchResponse(global.basePlants);
    const { getByTestId, findAllByTestId } = render(<App />);
    
    // Wait for plants to load
    await waitFor(async () => {
      const plants = await findAllByTestId('plant-item');
      expect(plants).toHaveLength(3);
    });
    
    // Search for 'Aloe'
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Aloe' } });
    
    // Check filtered results
    await waitFor(async () => {
      const filteredPlants = await findAllByTestId('plant-item');
      expect(filteredPlants).toHaveLength(1);
      const plantName = filteredPlants[0].querySelector('h3').textContent;
      expect(plantName).toBe('Aloe Vera');
    });
  });
});