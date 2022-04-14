import React from 'react';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { Avatar, Chip } from '@mui/material';
import Link from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number' },
  { field: 'type', headerName: 'Type', type: 'string' },
  {
    field: 'color',
    headerName: 'Color',
    type: 'string',
    width: 200,
    renderCell: ({ value }) => (
      <Chip
        variant="outlined"
        sx={{ border: 'none' }}
        avatar={
          <Avatar
            variant="square"
            sx={{ width: 24, height: 24, bgcolor: `rgb(${value.join()})` }}
          >
            {' '}
          </Avatar>
        }
        label={value.join(' ')}
      />
    ),
  },
  {
    field: 'state',
    headerName: 'State',
    renderCell: ({ value }) =>
      value && (
        <Link href={`/states/${value.id}`}>
          <a>{value.name}</a>
        </Link>
      ),
  },
  {
    field: 'continent',
    headerName: 'Continent',
    renderCell: ({ value }) =>
      value && (
        <Link href={`/continents/${value.id}`}>
          <a>{value.name}</a>
        </Link>
      ),
  },
  { field: 'isCoastal', headerName: 'Is Coastal?', type: 'boolean' },
];

const ProvinceGrid: React.FC<Omit<DataGridProps, 'columns'>> = ({
  ...props
}) => {
  return <DataGrid columns={columns} {...props} />;
};

export default ProvinceGrid;
