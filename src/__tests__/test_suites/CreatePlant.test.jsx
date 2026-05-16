import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "../../App";
import "@testing-library/jest-dom";

describe("2nd Deliverable", () => {
  const mockPlants = [
    { id: 1, name: "Aloe Vera", price: "15.99", inStock: true, image: "aloe.jpg" },
  ];

  beforeEach(() => {
    // Reset and set up fetch mock before each test
    if (global.resetFetchMock) {
      global.resetFetchMock();
    }
    if (global.setFetchResponse) {
      global.setFetchResponse(mockPlants);
    }
    if (global.setPostFetchResponse) {
      global.setPostFetchResponse({ 
        id: 2, 
        name: "foo", 
        image: "foo_plant_image_url", 
        price: "10", 
        inStock: true 
      });
    }
  });

  test("adds a new plant when the form is submitted", async () => {
    render(<App />);
    
    // Wait for the initial plants to load
    await waitFor(() => {
      expect(screen.getByText("Aloe Vera")).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Fill out the form
    const nameInput = screen.getByPlaceholderText(/plant name/i);
    const imageInput = screen.getByPlaceholderText(/image url/i);
    const priceInput = screen.getByPlaceholderText(/price/i);
    const submitButton = screen.getByRole("button", { name: /add plant/i });
    
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(imageInput, { target: { value: "foo_plant_image_url" } });
    fireEvent.change(priceInput, { target: { value: "10" } });
    fireEvent.click(submitButton);
    
    // Verify the POST request was made correctly
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/plants",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining("foo")
        })
      );
    });
  });
});