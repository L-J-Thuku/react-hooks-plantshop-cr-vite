import React, { useState, useEffect } from 'react';
import './App.css';
import PlantCard from './components/PlantCard';
import Search from './components/Search';
import NewPlantForm from './components/NewPlantForm';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all plants on page load
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched plants:', data);
        setPlants(data);
      })
      .catch(error => console.error('Error fetching plants:', error));
  }, []);

  // Add a new plant
  const addPlant = (newPlant) => {
    const plantToSend = {
      name: newPlant.name,
      image: newPlant.image,
      price: newPlant.price.toString(), // Ensure price is string
      inStock: true
    };
    
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plantToSend),
    })
      .then(response => response.json())
      .then(data => {
        setPlants([...plants, data]);
      })
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
  const filteredPlants = Array.isArray(plants) ? plants.filter(plant =>
    plant.name && plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="app">
      <h1>Plantshop</h1>
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
    </div>
  );
}

export default App;