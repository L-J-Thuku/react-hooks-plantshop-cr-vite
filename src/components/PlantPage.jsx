import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { useState } from "react";

function PlantPage({ plants, onAddPlant }) {
   const [searchTerm, setSearchTerm] = useState("");

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant}/>
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
      <PlantList plants={filteredPlants}/>
    </main>
  );
}

export default PlantPage;