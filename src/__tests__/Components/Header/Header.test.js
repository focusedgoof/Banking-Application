import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../../Components/Header/Header';

describe('Header Component', () => {
  it('renders header correctly', async () => {
    const handleLogout = jest.fn();
    render(
      <Router>
        <Header handleLogout={handleLogout} />
      </Router>
    );

    // Check if the logo is rendered
    expect(screen.getByAltText('logo')).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByText('Beneficiaries')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls handleLogout when Logout link is clicked', async () => {
    const handleLogout = jest.fn();
    render(
      <Router>
        <Header handleLogout={handleLogout} />
      </Router>
    );

    fireEvent.click(screen.getByText('Logout'));

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      expect(handleLogout).toHaveBeenCalledTimes(1);
    });
  });

  it('matches snapshot', () => {
    const handleLogout = jest.fn();
    const { asFragment } = render(
      <Router>
        <Header handleLogout={handleLogout} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
