import { GetStaticProps, NextPage } from 'next';
import { Container } from '@mui/material';
import client from '../../apollo-client';
import ProvinceGrid from '../../components/ProvinceGrid';
import ProvincesQuery from '../../graphql/provinces-query.graphql';

const Provinces: NextPage<any> = ({ provinces }) => {
  return (
    <>
      <ProvinceGrid rows={provinces} pageSize={10} autoHeight />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: ProvincesQuery,
  });

  return {
    props: {
      provinces: data.provinces,
    },
  };
};

export default Provinces;
