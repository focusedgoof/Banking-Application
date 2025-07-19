import React from 'react';
import { render } from '@testing-library/react';
import TransactionProvider from '../../../Components/Transactions/TransactionProvider';

test('renders TransactionProvider component snapshot', () => {
  const { asFragment } = render(<TransactionProvider />);
  expect(asFragment()).toMatchSnapshot();
});
