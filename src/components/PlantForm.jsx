// src/components/PlantForm.jsx
import React, { useState, useEffect } from 'react';

function PlantForm({ onAddPlant, onClose, selectedImage = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      setFormData(prev => ({
        ...prev,
        image: selectedImage
      }));
    }
  }, [selectedImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAddPlant({
      name: formData.name,
      image: formData.image || 'https://placehold.co/400x400?text=🌿',
      price: parseFloat(formData.price),
    });
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Plant</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            placeholder="e.g., Monstera Deliciosa"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL 
            <span className="text-xs text-gray-500 ml-2">(or select from gallery below)</span>
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={e => setFormData({...formData, image: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            placeholder="https://example.com/plant.jpg"
          />
          {formData.image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            placeholder="45.99"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Plant...' : '🌱 Add Plant'}
        </button>
      </form>
    </div>
  );
}

export default PlantForm;