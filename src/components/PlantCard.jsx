import React, { useState } from "react";

function PlantCard({ plant }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  const toggleStock = () => setIsSoldOut(!isSoldOut);

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {/* Display price directly – no $ sign, no .toFixed(2) */}
      <p>Price: {plant.price}</p>
      {isSoldOut ? (
        <button onClick={toggleStock}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={toggleStock}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;