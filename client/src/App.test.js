import { render, screen } from '@testing-library/react';
import App from './App';
import React, {test, expect} from 'react';

test('renders sent header', () => {
  render(<App />);
  const linkElement = screen.getByText(/sent/i);
  expect(linkElement).toBeInTheDocument();
});
