import React, { useState, useEffect } from 'react';
import './App.css';
import PlantCard from './components/PlantCard';
import Search from './components/Search';
import NewPlantForm from './components/NewPlantForm';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => setPlants(data))
      .catch(error => console.error('Error fetching plants:', error));
  }, []);

  const addPlant = (newPlant) => {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newPlant.name,
        image: newPlant.image,
        price: newPlant.price.toString(),
        inStock: true
      }),
    })
      .then(response => response.json())
      .then(data => setPlants([...plants, data]))
      .catch(error => console.error('Error adding plant:', error));
  };

  const toggleSoldOut = (id) => {
    const updatedPlants = plants.map(plant => 
      plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
    );
    setPlants(updatedPlants);
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Plantshop</h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NewPlantForm addPlant={addPlant} />
      <div className="plant-grid">
        {filteredPlants.map(plant => (
          <div key={plant.id} data-testid="plant-item">
            <PlantCard plant={plant} toggleSoldOut={toggleSoldOut} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;