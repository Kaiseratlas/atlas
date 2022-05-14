import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import client from '../../../../apollo-client';
import ResourceQuery from '../../../../graphql/queries/resources/resource-query.graphql';
import React from 'react';
import { FormGroup, InputGroup, NumericInput } from '@blueprintjs/core';

const ResourceInfo: NextPage<any> = ({ resource }) => {
  return (
    <div>
      <h1 className="bp4-heading">{resource.name}</h1>
      <blockquote className="bp4-text-large bp4-running-text bp4-blockquote">
        {resource.description}
      </blockquote>
      <FormGroup label="ID" labelFor="text-input">
        <InputGroup id="id" readOnly value={resource.id} large />
      </FormGroup>
      <FormGroup label="CIC" labelFor="text-input">
        <NumericInput id="id" readOnly value={resource.CIC} large />
      </FormGroup>
      <FormGroup label="Convoys" labelFor="text-input">
        <NumericInput id="id" readOnly value={resource.convoys} large />
      </FormGroup>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: ResourceQuery,
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
    variables: {
      id: params?.id,
    },
  });

  return {
    props: {
      resource: data.resource,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default ResourceInfo;
