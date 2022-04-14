import {GetStaticProps, NextPage} from "next";
import {useRouter} from "next/router";
import {Container} from "@mui/material";
import client from "../../../apollo-client";
import {gql} from "@apollo/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Link from "next/link";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number' },
  { field: 'name', headerName: 'Name', flex: 1, renderCell: ({ row, value }) => <Link href={`/state/categories/${row.id}`}><a>{value}</a></Link> },
];

const StateCategories: NextPage<any> = ({ stateCategories }) => {
  const router = useRouter()
  console.log('stateCategories', stateCategories)
  return (
    <Container maxWidth="lg">
      <DataGrid columns={columns} rows={stateCategories} pageSize={10} autoHeight />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ()  => {
  const { data } = await client.query({
    query: gql`
        query StateCategories {
          stateCategories {
            id
            name
          }
}
      `,
  });

  return {
    props: {
      stateCategories: data.stateCategories,
    },
  };
}


export default StateCategories;
