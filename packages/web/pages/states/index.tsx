import { GetStaticProps, NextPage } from 'next';
import {
  Avatar,
  Chip,
  Container,
  Breadcrumbs,
  Link,
  Typography,
} from '@mui/material';
import client from '../../apollo-client';
import { useRouter } from 'next/router';
import StateGrid from '../../components/StateGrid';
import StatesQuery from '../../graphql/states-query.graphql';

const States: NextPage<any> = ({ states }) => {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Kaiserreich
        </Link>
        <Typography color="text.primary">States</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom component="div">
        States
      </Typography>
      <StateGrid rows={states} autoHeight pageSize={10} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: StatesQuery,
  });

  return {
    props: {
      states: data.states,
    },
  };
};

export default States;
