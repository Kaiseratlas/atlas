import type { NextPage } from 'next'
import client from "../apollo-client";
import {gql} from "@apollo/client";
import {Container, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";

const Home: NextPage<any> = ({ countries }) => {
  return (
    <Container maxWidth="lg">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Tag
            </TableCell>
            <TableCell align="right">
              Manpower
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((c, i) => {
            return <TableRow hover key={i}>
              <TableCell>
                <span>
                  <img src={`${c.currentFlag}?size=medium`} width={22} style={{ marginBottom: -2, marginRight: 8, outline: '1px solid #eaecf0' }} />
                  <span>{c.name}</span>
                </span>
               </TableCell>
              <TableCell>
                {c.tag}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat().format(c.manpower)}
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </Container>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        query Countries {
          countries {
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
  });

  return {
    props: {
      countries: data.countries,
    },
  };
}

export default Home
