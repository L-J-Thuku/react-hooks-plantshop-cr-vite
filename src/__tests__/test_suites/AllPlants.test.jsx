import { render, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('1st Deliverable', () => {
  test('displays all plants on startup', async () => {
    global.setFetchResponse(global.basePlants);
    const { findAllByTestId } = render(<App />);
    
    const plantItems = await findAllByTestId('plant-item');
    expect(plantItems).toHaveLength(3);
    
    const plantNames = plantItems.map((item) => item.querySelector('h3').textContent);
    expect(plantNames).toEqual(['Monstera', 'Snake Plant', 'Aloe Vera']);
  });

  test('plants aren\'t hardcoded', async () => {    
    global.setFetchResponse(global.alternatePlants);
    const { findAllByTestId } = render(<App />);
    
    const plantItems = await findAllByTestId('plant-item');
    expect(plantItems).toHaveLength(3);
    
    const plantNames = plantItems.map((item) => item.querySelector('h3').textContent);
    expect(plantNames).toEqual(['Rose', 'Tulip', 'Orchid']);
  });
});