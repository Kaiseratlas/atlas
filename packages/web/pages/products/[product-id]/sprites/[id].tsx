import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import client from '../../../../apollo-client';
import SpriteQuery from '../../../../graphql/queries/sprites/sprite-query.graphql';
import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

const SpriteInfo: NextPage<any> = ({ sprite }) => {
  return (
    <div>
      <h1 className="bp4-heading">{sprite.id}</h1>
      <FormGroup label="ID" labelFor="text-input">
        <InputGroup id="id" readOnly value={sprite.id} large />
      </FormGroup>
      <FormGroup label="Texture File Path" labelFor="text-input">
        <InputGroup id="id" readOnly value={sprite.textureFile} large />
      </FormGroup>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: SpriteQuery,
    context: {
      headers: {
        'X-Product-Name': params?.['product-id'],
        'X-Product-Version': '0.20.1',
      },
    },
    variables: {
      id: params?.id,
    },
  });

  return {
    props: {
      sprite: data.sprite,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default SpriteInfo;
