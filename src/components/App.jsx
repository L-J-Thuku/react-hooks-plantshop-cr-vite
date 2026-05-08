import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import PlantForm from './PlantForm';
import Search from './Search';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:3001/plants');
      const data = await response.json();
      setPlants(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (newPlant) => {
    try {
      const response = await fetch('http://localhost:3001/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newPlant, isSoldOut: false }),
      });
      const savedPlant = await response.json();
      setPlants([savedPlant, ...plants]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  const toggleSoldOut = (id) => {
    setPlants(plants.map(plant =>
      plant.id === id ? { ...plant, isSoldOut: !plant.isSoldOut } : plant
    ));
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Plantsy 🌱</h1>
      
      <button onClick={() => setShowForm(!showForm)} className="add-plant-btn">
        + Add New Plant
      </button>
      
      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <PlantForm onAddPlant={addPlant} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
      
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {loading ? (
        <p>Loading plants...</p>
      ) : (
        <div className="plants-grid">
          {filteredPlants.map(plant => (
            <PlantCard key={plant.id} plant={plant} onToggleSoldOut={toggleSoldOut} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;