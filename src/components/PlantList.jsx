import React from 'react';
import PlantCard from './PlantCard';

function PlantList({ plants, onUpdatePlant, onDeletePlant }) {
  if (!plants || plants.length === 0) {
    return <div className="no-plants">🌿 No plants found</div>;
  }

  return (
    <div className="plant-list">
      {plants.map(plant => (
        <PlantCard 
          key={plant.id}
          plant={plant}
          onUpdatePlant={onUpdatePlant}
          onDeletePlant={onDeletePlant}
        />
      ))}
    </div>
  );
}

export default PlantList;