import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "../../components/App";
import "@testing-library/jest-dom";

describe("2nd Deliverable", () => {
  beforeEach(() => {
    if (global.resetFetchMock) {
      global.resetFetchMock();
    }
    if (global.setFetchResponse) {
      global.setFetchResponse([]);
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
    
    const nameInput = await screen.findByPlaceholderText(/plant name/i);
    const imageInput = screen.getByPlaceholderText(/image url/i);
    const priceInput = screen.getByPlaceholderText(/price/i);
    const submitButton = screen.getByRole("button", { name: /add plant/i });
    
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(imageInput, { target: { value: "foo_plant_image_url" } });
    fireEvent.change(priceInput, { target: { value: "10" } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/plants",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("foo")
        })
      );
    });
  });
});