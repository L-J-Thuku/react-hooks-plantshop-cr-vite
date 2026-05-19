import React, { useState } from 'react';

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(plant.price);

  const handleToggleStock = () => {
    onUpdatePlant(plant.id, { ...plant, inStock: !plant.inStock });
  };

  const handlePriceUpdate = () => {
    onUpdatePlant(plant.id, { ...plant, price: editedPrice });
    setIsEditing(false);
  };

  return (
    <div className="plant-card">
      <img src={plant.image || 'https://via.placeholder.com/200'} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p className="species">{plant.species}</p>
      
      {isEditing ? (
        <div className="edit-price">
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(Number(e.target.value))}
            step="0.01"
          />
          <button onClick={handlePriceUpdate} className="save-btn">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
        </div>
      ) : (
        <p className="price">${plant.price.toFixed(2)}</p>
      )}
      
      <div className="plant-actions">
        <button onClick={handleToggleStock} className={plant.inStock ? 'in-stock' : 'out-stock'}>
          {plant.inStock ? '✓ In Stock' : '✗ Sold Out'}
        </button>
        <button onClick={() => setIsEditing(true)} className="edit-btn">
          Edit Price
        </button>
        <button onClick={() => onDeletePlant(plant.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default PlantCard;