import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import Search from './Search';
import NewPlantForm from './NewPlantForm';

function PlantPage() {
  const [plants, setPlants] = useState([]); // Initialize as empty array, not undefined
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all plants on page load
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => setPlants(data))
      .catch(error => console.error('Error fetching plants:', error));
  }, []);

  // Add a new plant
  const addPlant = (newPlant) => {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newPlant,
        price: newPlant.price.toString() // Send price as string to match test expectation
      }),
    })
      .then(response => response.json())
      .then(data => setPlants([...plants, data]))
      .catch(error => console.error('Error adding plant:', error));
  };

  // Mark plant as sold out (frontend only)
  const toggleSoldOut = (id) => {
    const updatedPlants = plants.map(plant => 
      plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
    );
    setPlants(updatedPlants);
  };

  // Filter plants based on search query
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NewPlantForm addPlant={addPlant} />
      <div className="plant-grid">
        {filteredPlants.map(plant => (
          <div key={plant.id} data-testid="plant-item">
            <PlantCard 
              plant={plant} 
              toggleSoldOut={toggleSoldOut}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export default PlantPage;