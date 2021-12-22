import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import client from "../../../../client";
import { gql } from "@apollo/client";

const Commanders: NextPage<{ country: any }> = ({ country }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-9">
          <h1>Commanders</h1>
          <h2>Field Marshals</h2>
          <table
            className="bp3-html-table bp3-interactive bp3-html-table-striped"
            width="100%"
          >
            <thead>
              <th style={{ width: 0 }}>Image</th>
              <th style={{ width: "20%" }}>Name</th>
              <th>Description</th>
            </thead>
            <tbody>
              {country.history.fieldMarshals.map((leader: any) => {
                return (
                  <tr>
                    <td>
                      <img src={leader.portraitUrl} width={82}></img>
                    </td>
                    <td className="bp3-text-large">
                      <strong>{leader.name}</strong>
                    </td>
                    <td className="bp3-running-text">{leader.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>Corps Commanders</h2>
          <table
            className="bp3-html-table bp3-interactive bp3-html-table-striped"
            width="100%"
          >
            <thead>
              <th style={{ width: 0 }}>Image</th>
              <th style={{ width: "20%" }}>Name</th>
              <th>Description</th>
            </thead>
            <tbody>
              {country.history.corpsCommanders.map((leader: any) => {
                return (
                  <tr>
                    <td>
                      <img src={leader.portraitUrl} width={82}></img>
                    </td>
                    <td className="bp3-text-large">
                      <strong>{leader.name}</strong>
                    </td>
                    <td className="bp3-running-text">{leader.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>Navy Leaders</h2>
          <table
            className="bp3-html-table bp3-interactive bp3-html-table-striped"
            width="100%"
          >
            <thead>
              <th style={{ width: 0 }}>Image</th>
              <th style={{ width: "20%" }}>Name</th>
              <th>Description</th>
            </thead>


            <tbody>
              {country.history.navyLeaders.map((leader: any) => {
                return (
                  <tr>
                    <td>
                      <img src={leader.portraitUrl} width={82}></img>
                    </td>
                    <td className="bp3-text-large">
                      <strong>{leader.name}</strong>
                    </td>
                    <td className="bp3-running-text">{leader.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const tag = params["country-tag"];



  const { data } = await client.query({
    fetchPolicy: 'network-only',
    query: gql`
      query Country($tag: String!) {
        country(tag: $tag) {
          tag
          name
          history {
            fieldMarshals {
              commanderId
              name
              description
              portraitUrl
              skill
              attackSkill
              defenseSkill
              logisticsSkill
              planningSkill
            }
            corpsCommanders {
              commanderId
              name
              description
              portraitUrl
              skill
              attackSkill
              defenseSkill
              logisticsSkill
              planningSkill
            }
            navyLeaders {
              commanderId
              name
              description
              portraitUrl
              skill
              attackSkill
              defenseSkill
              maneuveringSkill
              coordinationSkill
            }
          }
        }
      }
    `,
    variables: { tag },
  });

  console.log('data', data.country.history.navyLeaders)

  return {
    props: {
      country: data.country,
    },
  };
};

export default Commanders;
