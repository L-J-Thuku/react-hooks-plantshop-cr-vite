import React, { useState, useEffect } from 'react';
import Header from './Header';
import PlantForm from './PlantForm';
import PlantCard from './PlantCard';
import Search from './Search';
import ImageGallery from './ImageGallery';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:3001/plants');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
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
          isSoldOut: false,
          image: newPlant.image || selectedImage || 'https://placehold.co/400x400?text=🌿'
        }),
      });
      const savedPlant = await response.json();
      setPlants([savedPlant, ...plants]);
      setShowForm(false);
      setSelectedImage(''); // Reset selected image
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  const toggleSoldOut = (id) => {
    setPlants(plants.map(plant =>
      plant.id === id ? { ...plant, isSoldOut: !plant.isSoldOut } : plant
    ));
  };

  const handleImageSelect = (imageUrl, imageData) => {
    setSelectedImage(imageUrl);
    // You can also auto-fill the form if it's open
    if (showForm) {
      // Optional: Dispatch event to fill form with image data
      window.dispatchEvent(new CustomEvent('imageSelected', { detail: { imageUrl, imageData } }));
    }
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container-custom py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Plant 🌱
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of beautiful indoor plants
          </p>
        </div>

        {/* Action Bar */}
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

        {/* Form Modal with Image Gallery */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
            <div onClick={e => e.stopPropagation()} className="max-w-2xl w-full my-8">
              <PlantForm 
                onAddPlant={addPlant} 
                onClose={() => setShowForm(false)}
                selectedImage={selectedImage}
              />
              
              {/* Image Gallery Section in Form */}
              <div className="mt-4">
                <ImageGallery 
                  onSelectImage={handleImageSelect}
                  currentImageUrl={selectedImage}
                />
              </div>
            </div>
          </div>
        )}

        {/* Stats Dashboard */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-900">{plants.length}</div>
            <div className="text-sm text-gray-600">Total Plants</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-green-600">{plants.filter(p => !p.isSoldOut).length}</div>
            <div className="text-sm text-gray-600">In Stock</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-orange-600">{plants.filter(p => p.isSoldOut).length}</div>
            <div className="text-sm text-gray-600">Sold Out</div>
          </div>
        </div>

        {/* Plants Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading your plant collection...</p>
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No plants found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? `No results for "${searchQuery}"` : "Start by adding your first plant"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
              >
                Add Your First Plant 🌱
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredPlants.length} of {plants.length} plants
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} onToggleSoldOut={toggleSoldOut} />
              ))}
            </div>
          </>
        )}
      </main>

      <style jsx>{`
        .container-custom {
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        @media (min-width: 640px) {
          .container-custom {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .container-custom {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;