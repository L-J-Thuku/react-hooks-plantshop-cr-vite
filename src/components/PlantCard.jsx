import React from 'react';

function PlantCard({ plant, toggleSoldOut }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>Price: ${plant.price}</p>
      <button 
        onClick={() => toggleSoldOut(plant.id)}
        className={plant.inStock ? 'in-stock' : 'sold-out'}
      >
        {plant.inStock ? 'In Stock' : 'Sold Out'}
      </button>
    </div>
  );
}

export default PlantCard;