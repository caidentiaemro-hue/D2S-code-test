import { Box, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 180,
    valueGetter: (_, row) => `${row.firstName ?? ''} ${row.lastName ?? ''}`,
  },
  { field: 'role', headerName: 'Role', width: 140 },
];

const ROWS = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, role: 'Lord Commander' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, role: 'Queen' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, role: 'Kingslayer' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, role: 'Faceless' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 23, role: 'Khaleesi' },
  { id: 6, lastName: 'Melisandre', firstName: 'Mel', age: 150, role: 'Red Priestess' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, role: 'Knight' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, role: 'Bard' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, role: 'Maester' },
];

export default function DataGridShowcase() {
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>DataGrid (MUI X)</Typography>
        <Typography variant="body2" color="text.secondary">
          Sortable, paginated, multi-select grid.
        </Typography>
      </Box>
      <Box sx={{ height: 420, width: '100%' }}>
        <DataGrid
          rows={ROWS}
          columns={COLUMNS}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Stack>
  );
}
