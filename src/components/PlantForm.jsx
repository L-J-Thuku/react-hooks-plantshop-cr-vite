import React, { useState } from 'react';

function PlantForm({ onAddPlant, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAddPlant({
      name: formData.name,
      image: formData.image || 'https://via.placeholder.com/400x400?text=🌿',
      price: parseFloat(formData.price),
    });
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Plant</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Monstera Deliciosa"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={e => setFormData({...formData, image: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="https://example.com/plant.jpg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="45.99"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Plant'}
        </button>
      </form>
    </div>
  );
}

export default PlantForm;