import { NextPage } from 'next';
import React from 'react';
import AbilitiesQuery from '../../../../graphql/queries/abilities/abilities-query.graphql';
import useAppQuery from '../../../../use-app-query';

const Abilities: NextPage<any> = () => {
  const { data, error } = useAppQuery(AbilitiesQuery);

  console.log('data', data, error);
  return (
    <>
      <h1 className="bp4-heading">Abilities</h1>
    </>
  );
};

export default Abilities;
