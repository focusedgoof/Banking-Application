import React from 'react';
import { render, getByText } from '@testing-library/react'; // Import getByText
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

// Create a global mock user data object
const mockUserData = {
  username: "Akshat Arya",
  Password: "Passw0rd",
  PAN: "ABCD1234E",
  Branch: "Branch A",
  IFSCCode: "IFSC001"
};

// Set up a beforeEach block to reset local storage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('App Component', () => {
    it('renders header when logged in', () => {
    // Mock local storage to simulate a logged-in user
    localStorage.setItem('user', JSON.stringify(mockUserData));

    const { getByText } = render( 
      <Router>
        <App />
      </Router>
    );

    const logoTextElement = getByText(/Anna Bank/i, { selector: '.logo-container p' });
    expect(logoTextElement).toBeInTheDocument();
  });

  it('redirects to /accountsummary when logged in', () => {
    // Mock local storage to simulate a logged-in user
    localStorage.setItem('user', JSON.stringify(mockUserData));

    const { queryByRole } = render(
      <Router>
        <App />
      </Router>
    );

    // Ensure that the redirect is triggered
    expect(queryByRole('button', { name: /Login/i })).toBeNull();
    expect(window.location.pathname).toBe('/accountsummary');
  });

  it('handles login and redirects to /accountsummary', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <Router>
        <App />
      </Router>
    );

    userEvent.type(getByPlaceholderText(/Username/i), 'validUser');
    userEvent.type(getByPlaceholderText(/Password/i), 'validPassword');

    userEvent.click(getByRole('button', { name: /Login/i }));

    // Ensure that the redirect is triggered after successful login
    expect(window.location.pathname).toBe('/');
  });

  it('handles logout and redirects to /', () => {
    // Mock local storage to simulate a logged-in user
    localStorage.setItem('user', JSON.stringify(mockUserData));

    const { getByText } = render(
      <Router>
        <App />
      </Router>
    );

    // Perform logout
    userEvent.click(getByText('Logout'));

    // Ensure that the redirect is triggered after logout
    expect(window.location.pathname).toBe('/');
  });
});
