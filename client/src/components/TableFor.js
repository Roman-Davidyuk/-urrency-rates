import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const TableFor = ({ title, rates }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedRates = rates.slice(startIndex, endIndex);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRates.map((rate, index) => (
              <TableRow key={index}>
                <TableCell align="center">{new Date(rate.date).toLocaleString()}</TableCell>
                <TableCell align="center">{rate.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(rates.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default TableFor;
