import { GetStaticProps, NextPage } from 'next';
import client from '../../apollo-client';
import ContinentsQuery from '../../graphql/continents-query.graphql';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
];

const Continents: NextPage<any> = ({ continents }) => {
  return <DataGrid columns={columns} rows={continents} autoHeight />;
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: ContinentsQuery,
  });

  return {
    props: {
      continents: data.continents,
    },
  };
};

export default Continents;
