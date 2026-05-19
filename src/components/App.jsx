import React, { useState, useEffect } from 'react';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => {
        setPlants(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleAddPlant = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newPlant = {
      name: formData.get('name'),
      image: formData.get('image'),
      price: formData.get('price'), // Send as string, not number
    };

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlant),
    })
      .then(response => response.json())
      .then(savedPlant => {
        setPlants([...plants, savedPlant]);
        event.target.reset();
      })
      .catch(error => console.error('Error:', error));
  };

  const handleToggleStock = (id, currentStatus) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: !currentStatus }),
    })
      .then(response => response.json())
      .then(updatedPlant => {
        setPlants(plants.map(plant => 
          plant.id === id ? { ...plant, inStock: !currentStatus } : plant
        ));
      })
      .catch(error => console.error('Error:', error));
  };

  const filteredPlants = plants.filter(plant => {
    if (!plant || !plant.name) return false;
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Plantshop</h1>
      
      <input
        type="text"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        data-testid="search-input"
      />
      
      <form onSubmit={handleAddPlant}>
        <input name="name" placeholder="Plant name" required />
        <input name="image" placeholder="Image URL" />
        <input name="price" placeholder="Price" step="0.01" required />
        <button type="submit">Add Plant</button>
      </form>
      
      {filteredPlants.map(plant => (
        <div key={plant.id} data-testid="plant-item">
          <h3>{plant.name}</h3>
          <p>{plant.species || ''}</p>
          <p>${plant.price}</p>
          <button
            onClick={() => handleToggleStock(plant.id, plant.inStock)}
            data-testid={`stock-button-${plant.id}`}
          >
            {plant.inStock ? 'In Stock' : 'Out of Stock'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;