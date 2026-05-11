
import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import './App.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPlant, setNewPlant] = useState({
    name: '',
    image: '',
    price: ''
  });

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => {
        setPlants(data);
        setLoading(false);
      })
      .catch(() => {
        setPlants([
          { id: 1, name: 'Monstera Deliciosa', image: 'https://example.com/monstera.jpg', price: 45.99, inStock: true },
          { id: 2, name: 'Snake Plant', image: 'https://example.com/snake.jpg', price: 25.99, inStock: true }
        ]);
        setLoading(false);
      });
  }, []);

  const handleAddPlant = (e) => {
    e.preventDefault();
    
    const newPlantData = {
      name: newPlant.name,
      image: newPlant.image,
      price: parseFloat(newPlant.price),
      inStock: true,
      id: plants.length + 1
    };

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlantData),
    })
      .then(res => res.json())
      .then(data => {
        setPlants([...plants, data]);
        setNewPlant({ name: '', image: '', price: '' });
        setShowForm(false);
      })
      .catch(() => {
        setPlants([...plants, newPlantData]);
        setNewPlant({ name: '', image: '', price: '' });
        setShowForm(false);
      });
  };

  const handleUpdateStock = (id, inStock) => {
    const updatedPlants = plants.map(plant =>
      plant.id === id ? { ...plant, inStock } : plant
    );
    setPlants(updatedPlants);
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Plantsy 🌱</h1>
      
      <button 
        className="add-plant-btn"
        onClick={() => setShowForm(!showForm)}
      >
        + Add New Plant
      </button>

      {showForm && (
        <form className="new-plant-form" onSubmit={handleAddPlant}>
          <input
            type="text"
            name="name"
            placeholder="e.g., Monstera Deliciosa"
            value={newPlant.name}
            onChange={(e) => setNewPlant({...newPlant, name: e.target.value})}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newPlant.image}
            onChange={(e) => setNewPlant({...newPlant, image: e.target.value})}
          />
          <input
            type="number"
            name="price"
            placeholder="45.99"
            step="0.01"
            value={newPlant.price}
            onChange={(e) => setNewPlant({...newPlant, price: e.target.value})}
          />
          <button type="submit">Add Plant</button>
        </form>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder="Type a name to search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading plants...</p>
      ) : (
        <div className="plants-grid">
          {filteredPlants.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onUpdateStock={handleUpdateStock}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

