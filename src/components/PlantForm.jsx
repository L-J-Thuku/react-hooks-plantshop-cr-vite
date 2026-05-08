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
      image: formData.image || 'https://placehold.co/400x400?text=🌿',
      price: parseFloat(formData.price),
    });
    setLoading(false);
    setFormData({ name: '', image: '', price: '' });
  };

  return (
    <div className="plant-form">
      <h2>Add New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="e.g., Monstera Deliciosa"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="url"
          name="image"
          placeholder="https://example.com/plant.jpg"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <input
          type="number"
          name="price"
          placeholder="45.99"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          step="0.01"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Plant'}
        </button>
      </form>
    </div>
  );
}

export default PlantForm;