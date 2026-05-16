import React, { useState } from 'react';

function NewPlantForm({ addPlant }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: 0,
    inStock: true
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPlant(formData);
    setFormData({ name: '', image: '', price: 0, inStock: true });
  };

  return (
    <form onSubmit={handleSubmit} className="new-plant-form">
      <h2>Add New Plant</h2>
      <input
        type="text"
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;