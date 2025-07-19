import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../../Components/Login/Login';

describe('Login Component', () => {
  it('displays error message for empty credentials', () => {
    render(
      <MemoryRouter>
        <Login handleLogin={jest.fn()} />
      </MemoryRouter>
    );

    // Click the login button without entering credentials
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Check if error message is displayed
    expect(screen.getByText('Please enter both username and password')).toBeInTheDocument();
  });

  it('displays error message for invalid credentials', async () => {
    render(
      <MemoryRouter>
        <Login handleLogin={jest.fn()} />
      </MemoryRouter>
    );

    // Enter invalid credentials
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'invaliduser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });

    // Click the login button
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Check if error message is displayed
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });
});
