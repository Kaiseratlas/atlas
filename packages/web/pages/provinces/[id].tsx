import {GetStaticProps, NextPage} from "next";
import {useRouter} from "next/router";
import {Avatar, Chip, Container} from "@mui/material";
import client from "../../apollo-client";
import {gql} from "@apollo/client";
import ProvinceGrid from "../../components/ProvinceGrid";

const ProvinceInfo: NextPage<any> = ({ province }) => {
  return (
    <Container maxWidth="lg">
      {/*<ProvinceGrid rows={resolvers} pageSize={10} autoHeight />*/}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ()  => {
  const { data } = await client.query({
    query: gql`
        query Provinces {
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
}
      `,
  });

  return {
    props: {
      provinces: data.provinces,
    },
  };
}


export default ProvinceInfo;
