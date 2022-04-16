import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { Avatar, Chip, Link } from '@mui/material';
import React from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number' },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    renderCell: ({ row }) => (
      <Link href={`/states/${row.id}`}>
        <a>{row.name}</a>
      </Link>
    ),
  },
  {
    field: 'controller',
    headerName: 'Controller',
    width: 200,
    renderCell: ({ value }) => (
      <>
        <Chip
          sx={{ border: 'none' }}
          variant="outlined"
          avatar={
            <Avatar
              imgProps={{
                sx: {
                  height: 'auto',
                  border: '1px solid #eaecf0',
                },
              }}
              variant="square"
              alt={value.tag}
              src={value.currentFlag}
            />
          }
          label={
            <Link href={`/countries/${value.tag}`}>
              <a>{value.name}</a>
            </Link>
          }
        />
      </>
    ),
  },
  // { field: 'coreOf', headerName: 'Core Of', width: 200, renderCell: ({ value }) => <>
  //     {value.map((value) => <Chip sx={{ border: 'none' }} variant="outlined" avatar={<Avatar imgProps={{ sx: {
  //         height: 'auto',
  //         border: '1px solid #eaecf0'
  //       } }} variant="square" alt={value.tag} src={value.currentFlag} />}
  //     />)}
  //   </> },
  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    renderCell: ({ value }) => (
      <Link href={`/state/categories/${value.id}`}>
        <a>{value.name}</a>
      </Link>
    ),
  },
  { field: 'impassable', headerName: 'Is Impassable?', type: 'boolean' },
  { field: 'manpower', headerName: 'Population', type: 'number' },
];

const StateGrid: React.FC<Omit<DataGridProps, 'columns'>> = ({
  ...props
}) => {
  return <DataGrid columns={columns} {...props} />;
};

export default StateGrid;