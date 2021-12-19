import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { gql } from "@apollo/client";
import client from "../../client";

const Home: NextPage<{ ideologies: any[] }> = ({ ideologies }) => {
  console.log("ideologies", ideologies);
  return (
    <div className="container-fluid">
      {ideologies.map((ideology) => {
        return (
          <div
            className={styles.ideology}
            key={`ideology-${ideology.id}`}
            style={{ borderLeftColor: `rgb(${ideology.color.join()})` }}
          >
            <h4 className="bp3-heading">{ideology.name}</h4>
            <p>{ideology.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Ideologies {
        ideologies {
          id
          color
          description
          grouping
          name
          canBeBoosted
          canCollaborate
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

export default Home;
