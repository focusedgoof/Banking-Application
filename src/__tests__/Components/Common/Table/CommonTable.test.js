import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommonTable from '../../../../Components/Common/Table/CommonTable';

// Mock data for testing
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
];

const data = [
  { name: 'John Doe', age: 25 },
  { name: 'Jane Doe', age: 30 },
];

// Mock function for handleSearch
const handleSearch = jest.fn();

test('renders CommonTable component', () => {
  render(
    <CommonTable
      columns={columns}
      data={data}
      searchText=""
      handleSearch={handleSearch}
    />
  );

  // Check if the table headers are rendered
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Age')).toBeInTheDocument();

  // Check if the data rows are rendered
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();
});


