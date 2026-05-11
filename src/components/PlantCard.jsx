
import React from 'react';

function PlantCard({ plant, onUpdateStock }) {
  const handleStockToggle = () => {
    onUpdateStock(plant.id, !plant.inStock);
  };

  return (
    <div className="plant-card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>${plant.price}</p>
      <button 
        className={plant.inStock ? 'in-stock' : 'out-of-stock'}
        onClick={handleStockToggle}
      >
        {plant.inStock ? 'In Stock' : 'Out of Stock'}
      </button>
    </div>
  );
}

export default PlantCard;

