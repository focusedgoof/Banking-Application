import React from 'react';
import { render } from '@testing-library/react';
import AccountInfo from '../../../Components/AccountSummary/AccountInfo';

describe('AccountInfo Component', () => {
  it('matches snapshot', () => {
    const mockUserData = {
      Username: 'JohnDoe',
      AccountNumber: '123456789',
      IFSCCode: 'ABC123',
      Branch: 'Main Branch',
      Balance: 1000,
      PAN: 'ABCDE1234F',
    };

    const { asFragment } = render(<AccountInfo balance={mockUserData.Balance} />);

    expect(asFragment()).toMatchSnapshot();
  });
});