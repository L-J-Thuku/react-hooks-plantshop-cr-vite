import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('4th Deliverable', () => {
  test('filters plants by name on search', async () => {
    global.setFetchResponse(global.basePlants);
    
    const { getByTestId, findAllByTestId, queryAllByTestId } = render(<App />);
    
    // Wait for plants to load
    await findAllByTestId('plant-item');
    
    // Type search term
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Aloe' } });
    
    // Wait for filter to apply
    await waitFor(() => {
      const filteredPlants = queryAllByTestId('plant-item');
      expect(filteredPlants.length).toBe(1);
    });
    
    // Verify the filtered plant name
    const filteredPlants = queryAllByTestId('plant-item');
    const plantName = filteredPlants[0].querySelector('h3').textContent;
    expect(plantName).toBe('Aloe Vera');
  });
});