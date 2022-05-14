import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import client from '../../../../apollo-client';
import FocusQuery from '../../../../graphql/queries/focuses/focus-query.graphql';
import React from 'react';
import {
  Checkbox,
  FormGroup,
  InputGroup,
  NumericInput,
} from '@blueprintjs/core';

const FocusInfo: NextPage<any> = ({ focus }) => {
  console.log('focus', focus);
  return (
    <>
      <h2 className="bp4-heading">{focus.name}</h2>
      <h3 className="bp4-heading">Picture</h3>
      <img src={focus.iconUrl} />
      <h3 className="bp4-heading">Description</h3>
      <blockquote className="bp4-text-large bp4-running-text bp4-blockquote">
        {focus.description}
      </blockquote>
      <h3 className="bp4-heading">Parameters</h3>
      <FormGroup label="ID" labelFor="text-input">
        <InputGroup id="id" readOnly value={focus.id} large />
      </FormGroup>
      <FormGroup label="Cost" labelFor="text-input">
        <NumericInput id="id" readOnly value={focus.cost} large />
      </FormGroup>
      <FormGroup label="X" labelFor="text-input">
        <NumericInput id="id" readOnly value={focus.x} large />
      </FormGroup>
      <FormGroup label="Y" labelFor="text-input">
        <NumericInput id="id" readOnly value={focus.y} large />
      </FormGroup>
      <FormGroup label="Is available if the country has capitulated?" labelFor="text-input">
        <Checkbox
          id="id"
          readOnly
          checked={focus.availableIfCapitulated}
          large
        />
      </FormGroup>
      <FormGroup label="Will cancel if the trigger (available = { } ) is false?" labelFor="text-input">
        <Checkbox id="id" readOnly checked={focus.cancelIfInvalid} large />
      </FormGroup>
      <FormGroup label="Will continue even if the triggers (available = { } ) become false?" labelFor="text-input">
        <Checkbox id="id" readOnly checked={focus.continueIfInvalid} large />
      </FormGroup>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, error } = await client.query({
    query: FocusQuery,
    context: {
      headers: {
        'X-Product-Name': params?.['product-id'],
        'X-Product-Version': '0.20.1',
      },
    },
    variables: {
      id: params?.['focus-id'],
    },
  });

  console.log('error', error);

  return {
    props: {
      focus: data.focus,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default FocusInfo;
