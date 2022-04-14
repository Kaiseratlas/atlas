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
import { gql } from '@apollo/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number' },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    renderCell: ({ row }) => (
      <Link href={`/states/${row.id}`}>
        <a>{row.name}</a>
      </Link>
    ),
  },
  {
    field: 'controller',
    headerName: 'Controller',
    width: 200,
    renderCell: ({ value }) => (
      <>
        <Chip
          sx={{ border: 'none' }}
          variant="outlined"
          avatar={
            <Avatar
              imgProps={{
                sx: {
                  height: 'auto',
                  border: '1px solid #eaecf0',
                },
              }}
              variant="square"
              alt={value.tag}
              src={value.currentFlag}
            />
          }
          label={
            <Link href={`/countries/${value.tag}`}>
              <a>{value.name}</a>
            </Link>
          }
        />
      </>
    ),
  },
  // { field: 'coreOf', headerName: 'Core Of', width: 200, renderCell: ({ value }) => <>
  //     {value.map((value) => <Chip sx={{ border: 'none' }} variant="outlined" avatar={<Avatar imgProps={{ sx: {
  //         height: 'auto',
  //         border: '1px solid #eaecf0'
  //       } }} variant="square" alt={value.tag} src={value.currentFlag} />}
  //     />)}
  //   </> },
  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    renderCell: ({ value }) => (
      <Link href={`/state/categories/${value.id}`}>
        <a>{value.name}</a>
      </Link>
    ),
  },
  { field: 'impassable', headerName: 'Is Impassable?', type: 'boolean' },
  { field: 'manpower', headerName: 'Population', type: 'number' },
];

const States: NextPage<any> = ({ states }) => {
  const router = useRouter();
  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Kaiserreich
        </Link>
        <Typography color="text.primary">States</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom component="div">
        States
      </Typography>
      <DataGrid columns={columns} rows={states} pageSize={10} autoHeight />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query States {
        states {
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
          name
          manpower
          impassable
          buildingsMaxLevelFactor
        }
      }
    `,
  });

  return {
    props: {
      states: data.states,
    },
  };
};

export default States;
