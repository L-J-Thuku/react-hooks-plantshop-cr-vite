import { render, waitFor } from '@testing-library/react';
import App from '../../components/App';

describe('1st Deliverable', () => {
  test('displays all plants on startup', async () => {
    global.setFetchResponse(global.basePlants);
    const { findAllByTestId } = render(<App />);
    
    // Wait for all plants to render
    const plantItems = await findAllByTestId('plant-item', {}, { timeout: 3000 });
    expect(plantItems.length).toBe(3);
    
    // Check plant names
    const plantNames = plantItems.map(item => item.querySelector('h3').textContent);
    expect(plantNames).toContain('Monstera');
    expect(plantNames).toContain('Snake Plant');
    expect(plantNames).toContain('Aloe Vera');
  });

  test('plants aren\'t hardcoded', async () => {    
    global.setFetchResponse(global.alternatePlants);
    const { findAllByTestId } = render(<App />);
    
    const plantItems = await findAllByTestId('plant-item', {}, { timeout: 3000 });
    expect(plantItems.length).toBe(3);
    
    const plantNames = plantItems.map(item => item.querySelector('h3').textContent);
    expect(plantNames).toContain('Rose');
    expect(plantNames).toContain('Tulip');
    expect(plantNames).toContain('Orchid');
  });
});