import { NextPage } from "next";
import client from "../../client";
import { gql } from "@apollo/client";
import Countries from "./countries";

const Ideologies: NextPage<{ countries: any[] }> = ({ countries }) => {
  return (
    <>
      <h1>Ideologies</h1>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const { data } = await client.query({
    query: gql`
      query Ideologies {
        ideologies {
          name
        }
      }
    `,
  });

  return {
    props: {
      ideologies: data.ideologies,
    },
  };
}

export default Ideologies;
