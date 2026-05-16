import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "../../components/App";
import "@testing-library/jest-dom";

describe("3rd Deliverable", () => {
  const mockPlants = [
    { id: 1, name: "Aloe Vera", price: 15.99, inStock: true, image: "aloe.jpg" },
  ];

  beforeEach(() => {
    if (global.setFetchResponse) {
      global.setFetchResponse(mockPlants);
    }
  });

  test("marks a plant as sold out", async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText("Aloe Vera")).toBeInTheDocument();
    });
    
    const soldOutButton = screen.getByText(/in stock/i);
    fireEvent.click(soldOutButton);
    
    await waitFor(() => {
      expect(screen.getByText(/sold out/i)).toBeInTheDocument();
    });
  });
});