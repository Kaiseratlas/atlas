import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import client from '../../../../apollo-client';
import React from 'react';
import CountryQuery from '../../../../graphql/queries/countries/country-query.graphql';
import {
  Breadcrumb,
  Breadcrumbs,
  BreadcrumbProps,
  Icon,
  FormGroup,
  NumericInput,
} from '@blueprintjs/core';

const CountryInfo: NextPage<any> = ({ country, ideologies }) => {
  const router = useRouter();
  console.log('router', router.query);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: '/products', text: 'Products' },
    {
      href: `/products/${router.query['product-id']}`,
      text: 'Kaiserreich',
    },
    {
      href: `/products/${router.query['product-id']}/countries`,
      text: 'Countries',
    },
    {
      text: country.formalName,
    },
  ];

  return (
    <>
      <Breadcrumbs items={BREADCRUMBS} />
      <h1 className="bp4-heading">{country.formalName}</h1>
      <p>Country</p>
      <h3 className="bp4-heading">Details</h3>
      <FormGroup label="Population" labelFor="text-input">
        <NumericInput
          id="id"
          readOnly
          value={new Intl.NumberFormat().format(country.manpower)}
        />
      </FormGroup>
      <FormGroup label="Research slots" labelFor="text-input">
        <NumericInput id="id" readOnly value={country.researchSlots} />
      </FormGroup>
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
  const { data, error } = await client.query({
    query: CountryQuery,
    variables: {
      tag: params?.['country-tag'],
    },
    context: {
      headers: {
        'X-Product-Name': params?.['product-id'],
        'X-Product-Version': '0.20.1',
      },
    },
  });
  return {
    props: {
      country: data.country,
    },
  };
};

export default CountryInfo;
