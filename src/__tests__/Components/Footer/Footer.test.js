import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../Components/Footer/Footer.jsx';

test('renders Footer component with correct content', () => {
  render(<Footer />);

  // Check for the presence of address information
  expect(screen.getByText(/1234 Main Street Block-C/i)).toBeInTheDocument();
  expect(screen.getByText(/Delhi-110092/i)).toBeInTheDocument();
  expect(screen.getByText(/India/i)).toBeInTheDocument();

  // Check for the presence of email information
  expect(screen.getByText(/info@annabank.com/i)).toBeInTheDocument();

  // Check for the presence of phone information
  expect(screen.getByText(/\+91 23456 78901/i)).toBeInTheDocument();
  expect(screen.getByText(/\+91 88459 25744/i)).toBeInTheDocument();

  // Check for the copyright text
  expect(screen.getByText(/© 2023 Anna Bank. All rights reserved./i)).toBeInTheDocument();
});
