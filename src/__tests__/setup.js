import { vi } from 'vitest';
import '@testing-library/jest-dom';

global.setFetchResponse = (data) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
    status: 200,
  });
};

global.setPostFetchResponse = (data) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
    status: 201,
  });
};

global.resetFetchMock = () => {
  global.fetch = vi.fn();
};