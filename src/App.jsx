import React, { useState, useEffect } from 'react';
import PlantList from './components/PlantList';
import PlantForm from './components/PlantForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      // Mock data instead of API call for now
      const mockPlants = [
        { id: 1, name: 'Monstera', species: 'Monstera deliciosa', price: 25.99, inStock: true, image: 'https://via.placeholder.com/200' },
        { id: 2, name: 'Snake Plant', species: 'Sansevieria', price: 19.99, inStock: true, image: 'https://via.placeholder.com/200' },
        { id: 3, name: 'Fiddle Leaf Fig', species: 'Ficus lyrata', price: 45.99, inStock: false, image: 'https://via.placeholder.com/200' }
      ];
      setTimeout(() => {
        setPlants(mockPlants);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addPlant = (newPlant) => {
    const plantWithId = { ...newPlant, id: Date.now() };
    setPlants([...plants, plantWithId]);
  };

  const updatePlant = (id, updatedPlant) => {
    setPlants(plants.map(plant => plant.id === id ? updatedPlant : plant));
  };

  const deletePlant = (id) => {
    setPlants(plants.filter(plant => plant.id !== id));
  };

  const filteredPlants = plants.filter(plant =>
    plant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.species?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading plants...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>🌱 Plantshop</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantForm onAddPlant={addPlant} />
      <PlantList 
        plants={filteredPlants}
        onUpdatePlant={updatePlant}
        onDeletePlant={deletePlant}
      />
    </div>
  );
}

export default App;