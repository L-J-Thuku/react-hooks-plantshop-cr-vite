import React from 'react';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('Simple Test', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});