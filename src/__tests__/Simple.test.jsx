import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Simple Test', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});