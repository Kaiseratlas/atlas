import { GetStaticProps, NextPage } from 'next';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import client from '../../apollo-client';
import SpritesQuery from '../../graphql/sprites-query.graphql';
import React from 'react';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 300,
  },
  {
    field: 'textureFile',
    headerName: 'Texture File Path',
    minWidth: 300,
    flex: 1
  },
  {
    field: 'noOfFrames',
    headerName: 'No Of Frames',
    type: 'number',
    minWidth: 120,
  },
];

const Sprites: NextPage<any> = ({ sprites }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom component="div">
        Sprites
      </Typography>
      <DataGrid columns={columns} rows={sprites} pageSize={10} autoHeight />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: SpritesQuery,
  });

  return {
    props: {
      sprites: data.sprites,
    },
  };
};

export default Sprites;
