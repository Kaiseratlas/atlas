import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CountryLink: React.FC<any> = ({ country }) => {
  const router = useRouter();
  return (
    <span style={{ display: 'inline-block' }}>
      <img
        src={country.currentFlag}
        alt={country.tag}
        style={{
          width: 22,
          verticalAlign: 'middle',
          outline: '1px solid #eaecf0',
        }}
      />{' '}
      <Link
        href={{
          pathname: '/products/[product-id]/countries/[country-tag]',
          query: {
            ...router.query,
            'country-tag': country.tag,
          },
        }}
      >
        <a>{country.formalName}</a>
      </Link>
    </span>
  );
};

export default CountryLink;
