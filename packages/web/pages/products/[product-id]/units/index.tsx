import { NextPage } from 'next';
import React from 'react';
import { useQuery } from '@apollo/client';
import UnitsQuery from '../../../../graphql/queries/units/units-query.graphql';
import { Callout } from '@blueprintjs/core';

const Units: NextPage<any> = () => {
  const { data, error } = useQuery(UnitsQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });

  console.log('data', data, error);
  return (
    <>
      <h1 className="bp4-heading">Units</h1>
      {error && <Callout intent="danger">{error.message}</Callout>}
    </>
  );
}

export default Units;