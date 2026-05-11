import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Make fetch available globally
global.fetch = vi.fn();