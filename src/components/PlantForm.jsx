import React, { useState } from 'react';

function PlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    price: '',
    image: '',
    inStock: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.species || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    onAddPlant({
      ...formData,
      price: parseFloat(formData.price),
      id: Date.now()
    });
    
    setFormData({
      name: '',
      species: '',
      price: '',
      image: '',
      inStock: true
    });
  };

  return (
    <form className="plant-form" onSubmit={handleSubmit}>
      <h2>Add New Plant</h2>
      <input
        type="text"
        name="name"
        placeholder="Plant Name *"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="species"
        placeholder="Species *"
        value={formData.species}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price *"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={handleChange}
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
        />
        In Stock
      </label>
      <button type="submit" className="submit-btn">Add Plant</button>
    </form>
  );
}

export default PlantForm;