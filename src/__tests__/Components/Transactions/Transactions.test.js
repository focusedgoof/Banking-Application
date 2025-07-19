import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Transactions from '../../../Components/Transactions/Transactions';

jest.mock('../../../Utils/Utils', () => ({
  getLocalStorage: jest.fn(),
}));

describe('Transactions Component Snapshot Test', () => {
  test('renders Transactions component correctly with existing transactions', () => {
    const existingTransactions = [
      {
        userAccountNumber: '1234567890',
        beneficiaryAccountNumber: '0987654321',
        date: '2024-01-31',
        narration: 'Payment',
        debit: 100.0,
        credit: 0.0,
        balance: 5000.0,
      },
    ];

    const getLocalStorageMock = jest.fn();
    getLocalStorageMock.mockReturnValueOnce(JSON.stringify(existingTransactions));
    require('../../../Utils/Utils').getLocalStorage = getLocalStorageMock;

    const { asFragment } = render(<Transactions />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Transactions component correctly with no existing transactions', () => {
    const getLocalStorageMock = jest.fn();
    getLocalStorageMock.mockReturnValueOnce(JSON.stringify([]));
    require('../../../Utils/Utils').getLocalStorage = getLocalStorageMock;

    const { asFragment } = render(<Transactions />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Transactions component correctly', () => {
    const getLocalStorageMock = jest.fn();
    getLocalStorageMock.mockReturnValueOnce(JSON.stringify([]));
    require('../../../Utils/Utils').getLocalStorage = getLocalStorageMock;

    const { asFragment } = render(<Transactions />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Transactions component correctly with one existing transaction', () => {
    const existingTransactions = [
      {
        userAccountNumber: '1234567890',
        beneficiaryAccountNumber: '0987654321',
        date: '2024-01-31',
        narration: 'Payment',
        debit: 100.0,
        credit: 0.0,
        balance: 5000.0,
      },
    ];

    const getLocalStorageMock = jest.fn();
    getLocalStorageMock.mockReturnValueOnce(JSON.stringify(existingTransactions));
    require('../../../Utils/Utils').getLocalStorage = getLocalStorageMock;

    const { asFragment } = render(<Transactions />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Transactions component correctly with multiple existing transactions', () => {
    const existingTransactions = [
      {
        userAccountNumber: '1234567890',
        beneficiaryAccountNumber: '0987654321',
        date: '2024-01-31',
        narration: 'Payment',
        debit: 100.0,
        credit: 0.0,
        balance: 5000.0,
      },
      {
        userAccountNumber: '1234567890',
        beneficiaryAccountNumber: '1231231231',
        date: '2024-02-01',
        narration: 'Salary',
        debit: 0.0,
        credit: 2000.0,
        balance: 7000.0,
      },
    ];

    const getLocalStorageMock = jest.fn();
    getLocalStorageMock.mockReturnValueOnce(JSON.stringify(existingTransactions));
    require('../../../Utils/Utils').getLocalStorage = getLocalStorageMock;

    const { asFragment } = render(<Transactions />);
    expect(asFragment()).toMatchSnapshot();
  });
});
