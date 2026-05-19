import React, { useState, useEffect } from 'react';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddPlant = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        image: formData.get('image'),
        price: formData.get('price'),
      }),
    })
      .then(res => res.json())
      .then(newPlant => {
        setPlants([...plants, newPlant]);
        e.target.reset();
      })
      .catch(err => console.error(err));
  };

  const handleToggleStock = (id) => {
    const plant = plants.find(p => p.id === id);
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: !plant.inStock }),
    })
      .then(res => res.json())
      .then(updated => {
        setPlants(plants.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
      })
      .catch(err => console.error(err));
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onClick={() => handleToggleStock(plant.id)}
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