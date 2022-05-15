import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import client from '../../../apollo-client';
import ProductQuery from '../../../graphql/queries/products/product-query.graphql';
import React from 'react';

const ProductInfo: NextPage<any> = ({ product }) => {
  console.log('product', product);
  return (
    <>
      <h1 className="bp4-heading">{product.title}</h1>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: ProductQuery,
    variables: {
      id: params?.['product-id'],
    },
  });

  return {
    props: {
      product: data.product,
    },
  };
};

export default ProductInfo;
