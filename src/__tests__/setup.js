import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Create a mock fetch response function
global.setFetchResponse = (responseData) => {
  // Mock the global fetch function
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => responseData,
    status: 200,
  });
};

// For POST requests with specific responses
global.setPostFetchResponse = (responseData) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => responseData,
    status: 201,
  });
};

// For error responses
global.setFetchError = (errorMessage) => {
  global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));
};

// Reset fetch mock between tests
global.resetFetchMock = () => {
  global.fetch = vi.fn();
};