import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Beneficiary from '../../../Components/Beneficiary/Beneficiary';

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useRef: jest.fn(() => ({ current: {} })),
  };
});

// Mocking localStorage functions
jest.mock('../../../Utils/Utils', () => ({
  getLocalStorage: jest.fn(),
  setLocalStorage: jest.fn(),
}));

// Mock the fetchData function inside useEffect
jest.mock('../../../Components/Beneficiary/Beneficiary', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Beneficiary Component</div>,
  };
});

describe('Beneficiary Component Snapshot Test', () => {
  test('renders Beneficiary component correctly with existing beneficiaries', () => {
    const existingBeneficiaries = [
      {
        User: 'testUser',
        AccountUser: '1234567890',
        Beneficiary: 'John Doe',
        AccountBeneficiary: '0987654321',
        BranchBeneficiary: 'Test Branch',
      },
      // Add more beneficiary objects as needed
    ];

    const getLocalStorageMock = jest.fn();
    getLocalStorageMock.mockReturnValueOnce(JSON.stringify(existingBeneficiaries));
    require('../../../Utils/Utils').getLocalStorage = getLocalStorageMock;

    const { asFragment } = render(<Beneficiary />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Beneficiary component correctly with no existing beneficiaries', () => {
    const getLocalStorageMock = jest.fn();
    getLocalStorageMock.mockReturnValueOnce(JSON.stringify([]));
    require('../../../Utils/Utils').getLocalStorage = getLocalStorageMock;

    const { asFragment } = render(<Beneficiary />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Beneficiary component correctly', () => {
    const getLocalStorageMock = jest.fn();
    getLocalStorageMock.mockReturnValueOnce(JSON.stringify([]));
    require('../../../Utils/Utils').getLocalStorage = getLocalStorageMock;

    const { asFragment } = render(<Beneficiary />);
    expect(asFragment()).toMatchSnapshot();
  });
});
