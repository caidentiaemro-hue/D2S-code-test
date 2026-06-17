import {
  Box, Stack, Typography, Divider, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TableFooter, TablePagination,
} from '@mui/material';
import { useState } from 'react';

const ROWS = [
  { id: 1042, name: 'Acme Corp', status: 'paid', amount: 1200 },
  { id: 1043, name: 'Globex Inc', status: 'pending', amount: 840 },
  { id: 1044, name: 'Initech', status: 'failed', amount: 320 },
  { id: 1045, name: 'Hooli', status: 'paid', amount: 2100 },
  { id: 1046, name: 'Pied Piper', status: 'paid', amount: 660 },
  { id: 1047, name: 'Soylent', status: 'pending', amount: 90 },
];

const STATUS_COLOR = { paid: 'success', pending: 'warning', failed: 'error' };

export default function TablesShowcase() {
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rpp, setRpp] = useState(5);

  const sorted = [...ROWS].sort((a, b) => (order === 'asc' ? a.amount - b.amount : b.amount - a.amount));
  const paged = sorted.slice(page * rpp, page * rpp + rpp);

  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Table</Typography>
        <Typography variant="body2" color="text.secondary">
          Standard MUI Table with sortable header, status chips, and pagination.
        </Typography>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right" sortDirection={order}>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>#{r.id}</TableCell>
                <TableCell>{r.name}</TableCell>
                <TableCell>
                  <Chip label={r.status} color={STATUS_COLOR[r.status]} size="small" />
                </TableCell>
                <TableCell align="right">${r.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={ROWS.length}
                page={page}
                rowsPerPage={rpp}
                rowsPerPageOptions={[5, 10]}
                onPageChange={(_, p) => setPage(p)}
                onRowsPerPageChange={(e) => { setRpp(+e.target.value); setPage(0); }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Stack>
  );
}
