import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickTransfer from '../../../Components/QuickTransfer/QuickTransfer';

// Mocking localStorage methods
const mockGetLocalStorage = jest.fn();
const mockSetLocalStorage = jest.fn();

jest.mock('../../../Utils/Utils', () => ({
  ...jest.requireActual('../../../Utils/Utils'),
  getLocalStorage: mockGetLocalStorage,
  setLocalStorage: mockSetLocalStorage,
}));

describe('QuickTransfer Component', () => {
  const mockUserData = {
    Username: "Akshat Arya",
    Password: "Passw0rd",
    AccountNumber: 1234567890123456,
    Balance: 6707,
    PAN: "ABCD1234E",
    Branch: "Branch A",
    IFSCCode: "IFSC001"
  };

  const mockBeneficiaryData = [
    {
      User: 'testUser',
      AccountUser: '1234567890',
      Beneficiary: 'MockBeneficiary',
      AccountBeneficiary: '9876543210',
      BranchBeneficiary: 'MockBranch',
      Balance: 100,
    },
  ];

  // Mock TransactionContext
  const mockTransactionContext = {
    addTransaction: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetLocalStorage.mockImplementation(async (key) => {
      if (key === 'userData') return mockUserData;
      if (key === 'BeneficiaryData') return mockBeneficiaryData;
      return null;
    });
  });

  test('fetchData function fetches user details and beneficiary data', async () => {
    render(
      <QuickTransfer balance={null} />,
      {
        wrapper: ({ children }) => (
          <TransactionContext.Provider value={mockTransactionContext}>
            {children}
          </TransactionContext.Provider>
        ),
      }
    );

    // Wait for fetchData to complete
    await waitFor(() => {
      expect(mockGetLocalStorage).toHaveBeenCalledTimes(2);
    });

  });

});
