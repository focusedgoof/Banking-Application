import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from 'prop-types';
import './CommonTable.css';

const CommonTable = ({ columns, data, searchText, handleSearch }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
  // Apply search filter when searchText changes
    const filtered = data.filter((item) => {
      for (const key in item) {
        const value = String(item[key]).toLowerCase();
        if (value.includes(searchText.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    // Apply sort if there is a key in sortConfig
    if (sortConfig.key) {
      const sortedData = [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue, undefined, { numeric: true })
          : bValue.localeCompare(aValue, undefined, { numeric: true });
      });
      setFilteredData(sortedData);
    } 
    else {
      setFilteredData(filtered);
    }
  }, [searchText, sortConfig,data]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const totalData = filteredData.length;

  return (
    <TableContainer component={Paper} className="table-container" >
      <div className="table-header">
        <TextField
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Table className="common-table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>
                <TableSortLabel
                  active={sortConfig.key}
                  direction={sortConfig.key === column.key ? sortConfig.direction : "asc"}
                  onClick={() => handleSort(column.key)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              {
              columns.map((column) => (
                <TableCell key={column?.key}>{row[column?.key]}</TableCell>
              ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="table-footer">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          className="pages"
          count={totalData}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          ActionsComponent={(props) => (
            <div className="pagination-actions">
              <IconButton onClick={() => setPage(0)} disabled={page === 0}>
                <FirstPageIcon />
              </IconButton>
              <IconButton onClick={() => setPage(page - 1)} disabled={page === 0}>
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(totalData / rowsPerPage) - 1}
              >
                <KeyboardArrowRight />
              </IconButton>
              <IconButton
                onClick={() => setPage(Math.max(0, Math.ceil(totalData / rowsPerPage) - 1))}
                disabled={page >= Math.ceil(totalData / rowsPerPage) - 1}
              >
                <LastPageIcon />
              </IconButton>
            </div>
          )}
        />
      </div>
    </TableContainer>
  );
};

CommonTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
  searchText: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default CommonTable;
