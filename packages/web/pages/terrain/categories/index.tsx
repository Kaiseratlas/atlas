import { GetStaticProps, NextPage } from 'next';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import client from '../../../apollo-client';
import TerrainCategoriesQuery from '../../../graphql/terrain-categories-query.graphql';
import React from 'react';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 150,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'combatWidth',
    headerName: 'Combat width',
    type: 'number',
    minWidth: 150,
  },
  {
    field: 'combatSupportWidth',
    headerName: 'Combat Support Width',
    type: 'number',
    minWidth: 150,
  },
  {
    field: 'movementCost',
    headerName: 'Movement Cost',
    type: 'number',
    minWidth: 150,
  },
  {
    field: 'aiTerrainImportanceFactor',
    headerName: 'AI Terrain Importance Factor',
    type: 'number',
    minWidth: 150,
  },
  {
    field: 'isWater',
    headerName: 'Is Water?',
    type: 'boolean',
  },
];

const TerrainCategories: NextPage<any> = ({ terrainCategories }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom component="div">
        Terrain Categories
      </Typography>
      <DataGrid
        columns={columns}
        rows={terrainCategories}
        pageSize={10}
        autoHeight
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: TerrainCategoriesQuery,
  });

  return {
    props: {
      terrainCategories: data.terrainCategories,
    },
  };
};

export default TerrainCategories;
