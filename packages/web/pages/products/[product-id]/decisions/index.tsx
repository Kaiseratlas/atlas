import { NextPage } from 'next';
import React from 'react';
import { useQuery } from '@apollo/client';
import DecisionsQuery from '../../../../graphql/queries/decisions/decisions-query.graphql';
import { Callout } from '@blueprintjs/core';

const Decisions: NextPage<any> = () => {
  const { data, error } = useQuery(DecisionsQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });

  return (
    <>
      <h1 className="bp4-heading">Decisions</h1>
      {error && <Callout intent="danger">{error.message}</Callout>}
    </>
  );
}

export default Decisions;