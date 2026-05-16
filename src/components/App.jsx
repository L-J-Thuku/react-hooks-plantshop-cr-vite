import React from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import { useState,useEffect } from "react";

function App() {
    const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(r => r.json())
      .then(setPlants);
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