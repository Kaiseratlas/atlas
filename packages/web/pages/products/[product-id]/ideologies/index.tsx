import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import IdeologiesQuery from '../../../../graphql/queries/ideologies/ideologies-query.graphql';

const Ideologies: NextPage<any> = ({ ideologies }) => {
  return (
    <>
      <h1 className="bp4-heading">Ideologies</h1>

    </>
  );
};

export default Ideologies;
