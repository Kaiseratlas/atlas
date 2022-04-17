import type { NextPage } from 'next';
import client from '../../apollo-client';
import { Avatar, Chip, Link, Typography } from '@mui/material';
import CountriesQuery from '../../graphql/countries-query.graphql';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

const columns: GridColDef[] = [
  {
    field: 'tag',
    headerName: 'Tag',
    width: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 300,
    flex: 1,
    renderCell: ({ row }) => (
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
              alt={row.tag}
              src={row.currentFlag}
            />
          }
          label={
            <Link href={`/countries/${row.tag}`}>
              <a>{row.name}</a>
            </Link>
          }
        />
      </>
    ),
  },


  {
    field: 'manpower',
    headerName: 'Population',
    type: 'number',
    minWidth: 150,
  },
];

const Countries: NextPage<any> = ({ countries }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom component="div">
        Countries
      </Typography>
      <DataGrid
        columns={columns}
        rows={countries}
        pageSize={10}
        autoHeight
        getRowId={(row) => row.tag}
      />
    </>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: CountriesQuery,
  });

  return {
    props: {
      countries: data.countries,
    },
  };
}

export default Countries;
