import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  Avatar,
  Container,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Tooltip,
} from '@mui/material';
import { useRouter } from 'next/router';
import client from '../../apollo-client';
import { gql } from '@apollo/client';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';
import StateGrid from '../../components/StateGrid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    align: 'right',
    headerAlign: 'right',
    width: 300,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
    renderCell: ({ row }) => {
      const portraitUrl = [
        row.portraits.civilian?.large,
        row.portraits.army?.large,
        row.portraits.navy?.large,
      ].find((portrait) => portrait);
      return (
        <>
          <Avatar src={portraitUrl} sx={{ mr: 1 }} />
          <span>{row.name}</span>
        </>
      );
    },
  },
  {
    field: 'canBeCountryLeader',
    headerName: 'Country Leader',
    valueGetter: ({ row }) => {
      console.log('row', row.roles);
      return 'fdfdf';
    },
  },
];

const CountryInfo: NextPage<any> = ({ country, ideologies }) => {
  const router = useRouter();
  console.log('router', router.query);
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <img src={country.currentFlag} />
      <Typography variant="h3">{country.name}</Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Details" value="1" />
            <Tab label="Flags" value="2" />
            <Tab label="States" value="3" />
            <Tab label="Characters" value="4" />
          </TabList>
        </Box>
        <TabPanel value="2">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="right">Variant</TableCell>
                <TableCell colSpan={ideologies.length} align="center">
                  Ideologies
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                {ideologies.map((ideology, i) => {
                  return (
                    <TableCell key={i} align="center" width="9%">
                      <Tooltip title={ideology.name}>
                        <img src={ideology.icon} width={36} />
                      </Tooltip>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow selected>
                <TableCell align="right">Default</TableCell>
                {ideologies.map((ideology, i) => {
                  const flag = country.flags.find(
                    (flag) => flag.variant === ideology.id,
                  );
                  const defaultFlag = country.flags.find(
                    (flag) => !flag.variant,
                  );
                  return (
                    <TableCell key={i} align="center">
                      <Tooltip title={flag?.name ?? defaultFlag.name}>
                        <img
                          src={flag?.url ?? defaultFlag.url}
                          loading="lazy"
                          style={{
                            width: 82,
                            height: 52,
                            border: '1px solid #eaecf0',
                          }}
                        />
                      </Tooltip>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value="3">
          <StateGrid rows={country.states} autoHeight />
        </TabPanel>
        <TabPanel value="4">
          <DataGrid columns={columns} rows={country.characters} autoHeight />
        </TabPanel>
      </TabContext>
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
        ideologies {
          id
          name
          color
          grouping
          icon
          canBeBoosted
          canCollaborate
        }
        country(tag: $tag) {
          currentFlag
          tag
          name
          manpower
          characters {
            id
            name
            roles {
              __typename
            }
            portraits {
              civilian {
                large
                small
              }
              army {
                large
                small
              }
              navy {
                large
                small
              }
            }
          }
          states {
            id
            name
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
          }
          flags {
            name
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
      ideologies: data.ideologies,
    },
  };
};

export default CountryInfo;
