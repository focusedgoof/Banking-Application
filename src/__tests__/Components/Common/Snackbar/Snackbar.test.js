import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';  
import SnackBar from '../../../../Components/Common/SnackBar/SnackBar.jsx';

describe('SnackBar Component', () => {
  test('calls handleClose function when SnackBar is closed', () => {
    const mockHandleClose = jest.fn();
    render(<SnackBar open message="Test Message" severity="success" handleClose={mockHandleClose} />);

    // Close the SnackBar
    userEvent.click(screen.getByRole('button'));

    // Check if handleClose function was called
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
