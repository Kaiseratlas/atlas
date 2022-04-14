import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import client from '../../apollo-client';
import { gql } from '@apollo/client';

const CountryInfo: NextPage<any> = ({ country }) => {
  const router = useRouter();
  console.log('router', router.query);
  return (
    <Container maxWidth="lg">
      <img src={country.currentFlag} />
      <h3>{country.name}</h3>
    </Container>
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
    query: gql`
      query Country($tag: ID!) {
        country(tag: $tag) {
          currentFlag
          tag
          name
          manpower
          flags {
            variant
            url
          }
        }
      }
    `,
    variables: {
      tag: params.tag,
    },
  });
  return {
    props: {
      country: data.country,
    },
  };
};

export default CountryInfo;
