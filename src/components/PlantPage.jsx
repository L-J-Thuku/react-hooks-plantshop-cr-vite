import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // State for all plants fetched from backend
  const [plants, setPlants] = useState([]);
  // State for search input value
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch all plants on component mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Failed to fetch plants:", err));
  }, []);

  // 2. Add a new plant – POST request then update state
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((savedPlant) => setPlants([...plants, savedPlant]))
      .catch((err) => console.error("Failed to add plant:", err));
  };

  // 3. Search filter – case‑insensitive match on plant name
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;