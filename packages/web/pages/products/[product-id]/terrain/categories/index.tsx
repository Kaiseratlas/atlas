import { GetStaticProps, NextPage } from 'next';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import client from '../../../../../apollo-client';
import TerrainCategoriesQuery from '../../../../../graphql/queries/terrain-categories/terrain-categories-query.graphql';
import React from 'react';

const TerrainCategories: NextPage<any> = () => {
  return (
    <>

    </>
  );
};

export default TerrainCategories;
