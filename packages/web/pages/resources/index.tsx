import { GetStaticProps, NextPage } from 'next';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import client from '../../apollo-client';
import ResourcesQuery from '../../graphql/resources-query.graphql';
import React from 'react';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 250,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
];

const Ideologies: NextPage<any> = ({ resources }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom component="div">
        Resources
      </Typography>
      <DataGrid columns={columns} rows={resources} pageSize={10} autoHeight />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: ResourcesQuery,
  });

  return {
    props: {
      resources: data.resources,
    },
  };
};

export default Ideologies;
