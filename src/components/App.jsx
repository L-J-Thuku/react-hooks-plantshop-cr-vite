import React, { useState, useEffect } from 'react';
import Header from './Header';
import PlantForm from './PlantForm';
import PlantCard from './PlantCard';
import Search from './Search';

function App() {
  const [plants, setPlants] = useState([]); // Initialize as empty array
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/plants');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      // Ensure data is an array
      setPlants(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setError('Failed to load plants');
      setPlants([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (newPlant) => {
    try {
      const response = await fetch('http://localhost:3001/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...newPlant, 
          isSoldOut: false 
        }),
      });
      const savedPlant = await response.json();
      setPlants(prevPlants => [savedPlant, ...prevPlants]); // Use functional update
      setShowForm(false);
    } catch (error) {
      console.error('Error adding plant:', error);
      setError('Failed to add plant');
    }
  };

  const toggleSoldOut = (id) => {
    setPlants(prevPlants => 
      prevPlants.map(plant =>
        plant.id === id ? { ...plant, isSoldOut: !plant.isSoldOut } : plant
      )
    );
  };

  // Ensure plants is always an array before filtering
  const filteredPlants = Array.isArray(plants) 
    ? plants.filter(plant =>
        plant.name && plant.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Plant 🌱
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of beautiful indoor plants
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-sm"
          >
            <span className="text-xl">+</span>
            Add New Plant
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
            <div onClick={e => e.stopPropagation()} className="max-w-md w-full">
              <PlantForm 
                onAddPlant={addPlant} 
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{Array.isArray(plants) ? plants.length : 0}</div>
            <div className="text-sm text-gray-600">Total Plants</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {Array.isArray(plants) ? plants.filter(p => !p.isSoldOut).length : 0}
            </div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {Array.isArray(plants) ? plants.filter(p => p.isSoldOut).length : 0}
            </div>
            <div className="text-sm text-gray-600">Sold Out</div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading plants...</p>
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No plants found</h3>
            <p className="text-gray-600">
              {searchQuery ? `No results for "${searchQuery}"` : "Start by adding your first plant"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} onToggleSoldOut={toggleSoldOut} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;