import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "../../../../client";
import { gql } from "@apollo/client";
import React from "react";

import { Breadcrumbs, IBreadcrumbProps, Icon } from "@blueprintjs/core";
import { useRouter } from "next/router";

const Leaders: NextPage<{ country: any }> = ({ country }) => {
  const { push } = useRouter();
  const BREADCRUMBS: IBreadcrumbProps[] = [
    { href: "/countries", text: "Countries" },
    {
      href: `/countries/${country.tag}`,
      text: country.name,
      async onClick(e) {
        e.preventDefault()
        await push(`/countries/${country.tag}`);
      },
    },
    { text: "Leaders" },
  ];

  return (
    <>
      <div className="row col">
        <Breadcrumbs
          //currentBreadcrumbRenderer={this.renderCurrentBreadcrumb}
          items={BREADCRUMBS}
        />
      </div>
      <div className="row">
        <div className="col-lg-9">
          <h1>Leaders</h1>

          <table
            className="bp3-html-table bp3-interactive bp3-html-table-striped"
            width="100%"
          >
            <thead>
              <th style={{ width: 0 }}>Image</th>
              <th style={{ width: "20%" }}>Name</th>
              <th>Description</th>
              <th style={{ width: "20%" }}>Ideology</th>
            </thead>
            <tbody>
              {country.history.leaders.map((leader: any) => {
                return (
                  <tr>
                    <td>
                      <img src={leader.pictureUrl} width={82}></img>
                    </td>
                    <td className="bp3-text-large">
                      <strong>{leader.name}</strong>
                    </td>
                    <td className="bp3-running-text">{leader.description}</td>
                    <td>{leader.ideology.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/*{country.history.leaders.map((leader: any) => {*/}
          {/*  return <CountryLeaderCard leader={leader} />;*/}
          {/*})}*/}
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
    query: gql`
      query Country($tag: String!) {
        country(tag: $tag) {
          tag
          name
          history {
            leaders {
              name
              description
              expire
              pictureUrl
              ideology {
                name
              }
            }
            politics {
              electionFrequency
              electionsAllowed
              lastElection
            }
          }
        }
      }
    `,
    variables: { tag },
  });

  return {
    props: {
      country: data.country,
    },
  };
};

export default Leaders;
