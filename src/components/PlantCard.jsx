import React from "react";
import { useState } from "react";

function PlantCard({ plant }) {
  const [soldOut, setSoldOut] = useState(false);
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button
        onClick={() => setSoldOut(prev => !prev)}
        className={soldOut ? "primary" : ""}
      >
        {soldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;