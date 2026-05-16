import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../../App";
import "@testing-library/jest-dom";

describe("1st Deliverable", () => {
  const mockPlants = [
    { id: 1, name: "Aloe Vera", price: 15.99, inStock: true, image: "aloe.jpg" },
    { id: 2, name: "Snake Plant", price: 25.99, inStock: true, image: "snake.jpg" },
  ];

  beforeEach(() => {
    if (global.setFetchResponse) {
      global.setFetchResponse(mockPlants);
    }
  });

  test("displays all plants on startup", async () => {
    render(<App />);
    
    await waitFor(() => {
      const plantItems = screen.getAllByTestId("plant-item");
      expect(plantItems.length).toBe(2);
      expect(screen.getByText("Aloe Vera")).toBeInTheDocument();
      expect(screen.getByText("Snake Plant")).toBeInTheDocument();
    });
  });

  test("plants aren't hardcoded", async () => {
    const differentPlants = [
      { id: 3, name: "Fern", price: 12.99, inStock: true, image: "fern.jpg" },
    ];
    
    if (global.setFetchResponse) {
      global.setFetchResponse(differentPlants);
    }
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText("Fern")).toBeInTheDocument();
      expect(screen.queryByText("Aloe Vera")).not.toBeInTheDocument();
      expect(screen.queryByText("Snake Plant")).not.toBeInTheDocument();
    });
  });
});