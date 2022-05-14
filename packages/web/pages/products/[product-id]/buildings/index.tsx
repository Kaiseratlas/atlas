import { NextPage } from 'next';
import React from 'react';
import BuildingsQuery from '../../../../graphql/queries/buildings/buildings-query.graphql';
import useAppQuery from '../../../../use-app-query';

const Buildings: NextPage<any> = () => {
  const { data } = useAppQuery(BuildingsQuery);

  console.log('data', data);
  return (
    <>
      <h1 className="bp4-heading">Buildings</h1>
    </>
  );
};

export default Buildings;
