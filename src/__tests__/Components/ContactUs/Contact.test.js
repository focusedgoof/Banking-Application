import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../../../Components/ContactUs/Contact';

describe('Contact Component', () => {
  it('renders contact details and additional information', () => {
    render(<Contact />);

    // Assert that contact details are rendered
    expect(screen.getByText(/1234 Main Street Block-C/i)).toBeInTheDocument();
    expect(screen.getByText(/Delhi-110092/i)).toBeInTheDocument();
    expect(screen.getByText(/India/i)).toBeInTheDocument();
    expect(screen.getByText(/info@annabank.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 23456 78901/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 88459 25744/i)).toBeInTheDocument();

    // Assert that additional information is rendered
    expect(screen.getByText(/additional information/i)).toBeInTheDocument();
    expect(screen.getByText(/for customer support, inquiries, or feedback/i)).toBeInTheDocument();
    expect(screen.getByText(/our customer service team is available during business hours/i)).toBeInTheDocument();
  });
});