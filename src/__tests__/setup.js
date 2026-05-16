import { vi } from 'vitest';
import '@testing-library/jest-dom';

global.setFetchResponse = (data) => {
  global.fetch = vi.fn().mockImplementation((url) => {
    if (url === 'http://localhost:6001/plants') {
      return Promise.resolve({
        ok: true,
        json: async () => data,
        status: 200,
        headers: new Headers(),
      });
    }
    return Promise.reject(new Error('Not found'));
  });
};

global.setPostFetchResponse = (data) => {
  // Preserve existing mock and add POST handling
  const originalFetch = global.fetch;
  global.fetch = vi.fn().mockImplementation((url, options) => {
    if (options?.method === 'POST') {
      return Promise.resolve({
        ok: true,
        json: async () => data,
        status: 201,
        headers: new Headers(),
      });
    }
    if (originalFetch && url === 'http://localhost:6001/plants') {
      return originalFetch(url);
    }
    return Promise.reject(new Error('Not found'));
  });
};

global.resetFetchMock = () => {
  global.fetch = vi.fn();
};

// Default mock response
global.setFetchResponse([]);