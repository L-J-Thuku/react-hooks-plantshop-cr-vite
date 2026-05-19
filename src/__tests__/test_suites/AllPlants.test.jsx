import { render, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('1st Deliverable', () => {
  test('displays all plants on startup', async () => {
    global.setFetchResponse(global.basePlants);
    const { findAllByTestId } = render(<App />);
    
    const plantItems = await findAllByTestId('plant-item');
    expect(plantItems).toHaveLength(global.basePlants.length);
    
    const plantNames = plantItems.map((item) => item.querySelector('h3').textContent);
    const basePlantNames = global.basePlants.map((plant) => plant.name);
    expect(plantNames).toEqual(basePlantNames);
  });

  test('plants aren\'t hardcoded', async () => {    
    global.setFetchResponse(global.alternatePlants);
    const { findAllByTestId } = render(<App />);
    
    const plantItems = await findAllByTestId('plant-item');
    expect(plantItems).toHaveLength(global.alternatePlants.length);
    
    const plantNames = plantItems.map((item) => item.querySelector('h3').textContent);
    const basePlantNames = global.alternatePlants.map((plant) => plant.name);
    expect(plantNames).toEqual(basePlantNames);
  });
});