// Simple fetch mock without external dependencies
import { vi } from 'vitest';

// Define setFetchResponse on global
global.setFetchResponse = (responseData) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => responseData,
    status: 200,
    headers: new Headers(),
  });
};

// For POST requests
global.setPostFetchResponse = (responseData) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => responseData,
    status: 201,
    headers: new Headers(),
  });
};

// For error responses
global.setFetchError = (errorMessage) => {
  global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));
};

// For PATCH requests (mark as sold out)
global.setPatchFetchResponse = (responseData) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => responseData,
    status: 200,
    headers: new Headers(),
  });
};

// Reset fetch mock
global.resetFetchMock = () => {
  global.fetch = vi.fn();
};

// Set up default fetch mock (empty array)
global.setFetchResponse([]);