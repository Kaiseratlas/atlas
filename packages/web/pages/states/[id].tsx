import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  AppBar,
  Container,
  Drawer,
  Grid,
  MenuItem,
  MenuList,
  Typography,
  Toolbar,
} from '@mui/material';
import client from '../../apollo-client';
import { gql } from '@apollo/client';
import ProvinceGrid from '../../components/ProvinceGrid';

const StateInfo: NextPage<any> = ({ state }) => {
  console.log('state', state);
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item md={3}>
            <MenuList>
              <MenuItem>fdfdsf</MenuItem>
            </MenuList>
          </Grid>
          <Grid item md={9}>
            <Typography variant="h3" gutterBottom component="div">
              {state.name}
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
              Related Provinces
            </Typography>
            <ProvinceGrid rows={state.provinces} pageSize={10} autoHeight />
          </Grid>
        </Grid>
      </Container>
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
    query: gql`
      query GetState($id: ID!) {
        state(id: $id) {
          id
          category {
            id
            name
          }
          controller {
            tag
            currentFlag
            name
          }
          coreOf {
            tag
            currentFlag
            name
          }
          provinces {
            id
            color
            type
            isCoastal
            state {
              id
              name
            }
            continent {
              id
              name
            }
          }
          name
          manpower
          impassable
          buildingsMaxLevelFactor
        }
      }
    `,
    variables: {
      id: params.id,
    },
  });

  return {
    props: {
      state: data.state,
    },
  };
};

export default StateInfo;
