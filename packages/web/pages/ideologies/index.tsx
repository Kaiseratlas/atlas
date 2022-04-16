import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Avatar,
  Breadcrumbs,
  Chip,
  ChipProps,
  Container,
  Link,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import client from '../../apollo-client';
import React from 'react';
import IdeologyChip from '../../components/IdeologyChip';
import IdeologiesQuery from '../../graphql/ideologies-query.graphql';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 250,
    renderCell: ({ value }) => <code>{value}</code>,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    renderCell({ row }) {
      return <IdeologyChip ideology={row} />;
    },
  },
  { field: 'grouping', headerName: 'Grouping', width: 150 },
  {
    field: 'canBeBoosted',
    headerName: 'Can Be Boosted?',
    width: 150,
    type: 'boolean',
  },
  {
    field: 'canCollaborate',
    headerName: 'Can Collaborate?',
    width: 150,
    type: 'boolean',
  },
];

const Ideologies: NextPage<any> = ({ ideologies }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom component="div">
        Ideologies
      </Typography>
      <DataGrid columns={columns} rows={ideologies} pageSize={10} autoHeight />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: IdeologiesQuery,
  });

  return {
    props: {
      ideologies: data.ideologies,
    },
  };
};

export default Ideologies;
