import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "../../App";
import "@testing-library/jest-dom";

describe("4th Deliverable", () => {
  const mockPlants = [
    { id: 1, name: "Aloe Vera", price: 15.99, inStock: true, image: "aloe.jpg" },
    { id: 2, name: "Snake Plant", price: 25.99, inStock: true, image: "snake.jpg" },
    { id: 3, name: "Fern", price: 12.99, inStock: true, image: "fern.jpg" },
  ];

  beforeEach(() => {
    if (global.setFetchResponse) {
      global.setFetchResponse(mockPlants);
    }
  });

  test("filters plants by name on search", async () => {
    render(<App />);
    
    await waitFor(() => {
      const plantItems = screen.getAllByTestId("plant-item");
      expect(plantItems.length).toBe(3);
    });
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Snake" } });
    
    await waitFor(() => {
      expect(screen.getByText("Snake Plant")).toBeInTheDocument();
      expect(screen.queryByText("Aloe Vera")).not.toBeInTheDocument();
      expect(screen.queryByText("Fern")).not.toBeInTheDocument();
    });
    
    fireEvent.change(searchInput, { target: { value: "" } });
    
    await waitFor(() => {
      expect(screen.getByText("Aloe Vera")).toBeInTheDocument();
      expect(screen.getByText("Snake Plant")).toBeInTheDocument();
      expect(screen.getByText("Fern")).toBeInTheDocument();
    });
  });
});