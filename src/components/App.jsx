import React from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import { useState,useEffect } from "react";

function App() {
    const [plants, setPlants] = useState([]);

  // In your App component
useEffect(() => {
  fetch('/plants')
    .then(res => res.json())
    .then(data => setPlants(data));
}, []);

  function handleAddPlant(newPlant) {
    setPlants(prev => [...prev, newPlant]);
  }
  return (
    <div className="app">
      <Header />
      <PlantPage plants={plants} onAddPlant={handleAddPlant}/>
    </div>
  );
}

export default App;