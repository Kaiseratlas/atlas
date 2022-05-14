import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import client from '../../../../apollo-client';
import StateQuery from '../../../../graphql/queries/states/state-query.graphql';

const StateInfo: NextPage<any> = ({ state }) => {
  console.log('state', state);
  return <></>;
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: StateQuery,
    variables: {
      id: params?.['state-id'],
    },
  });

  return {
    props: {
      state: data.state,
    },
  };
};

export default StateInfo;
