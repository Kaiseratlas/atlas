import { GetStaticProps, NextPage } from 'next';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import client from '../../apollo-client';
import BuildingsQuery from '../../graphql/buildings-query.graphql';
import React from 'react';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 300,
  },
  {
    field: 'baseCost',
    headerName: 'Base Cost',
    type: 'number',
  },
];

const Buildings: NextPage<any> = ({ buildings }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom component="div">
        Buildings
      </Typography>
      <DataGrid columns={columns} rows={buildings} pageSize={10} autoHeight />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: BuildingsQuery,
  });

  return {
    props: {
      buildings: data.buildings,
    },
  };
};

export default Buildings;
