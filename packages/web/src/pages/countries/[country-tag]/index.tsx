import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "../../../../client";
import { gql } from "@apollo/client";
import { Card } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "../../../common/components/CountryCard.module.scss";
import { useRouter } from "next/router";
import CountryLeaderCard from "../../../common/components/CountryLeaderCard";
import { PieChart } from "react-minimal-pie-chart";
import { Typography } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import AppNav from '../../../common/components/AppNav';

const Country: NextPage<{ country: any }> = ({ country }) => {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const flag = new Image();
    flag.src = country.flagUrl;
    flag.onload = () => setLoading(true);
  }, []);

  const data = country.history.popularities.map((x: any) => ({
    title: x["ideology"]["name"],
    key: x["ideology"]["id"],
    color: x["ideology"]["color"],
    value: x.value,
  }));

  return (
    <div className="row">
      <AppNav />
      <div className="col-lg-9">
              <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          MUI
        </Link>
        <Link
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
        <Typography variant="h3" component="h1" gutterBottom>
          {country.localizedDefaultName}
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Politics
        </Typography>
        <PieChart
          animate
          style={{ width: 200, height: 200 }}
          totalValue={100}
          data={data}
        />
        <div className="row mb-md-2">
          <div className="col-md-2">
            <b>Political Power</b>
          </div>
          <div className="col-md-10">{country.history.politicalPower}</div>
        </div>
        <div className="row mb-md-2">
          <div className="col-md-2">
            <b>Stability</b>
          </div>
          <div className="col-md-10">{country.history.stability * 100}%</div>
        </div>
        <div className="row mb-md-2">
          <div className="col-md-2">
            <b>War Support</b>
          </div>
          <div className="col-md-10">{country.history.warSupport * 100}%</div>
        </div>
        <div className="row mb-md-2">
          <div className="col-md-2">
            <b>Convoys</b>
          </div>
          <div className="col-md-10">{country.history.convoys}</div>
        </div>
        {/*<Link href={`/countries/${country.tag}/leaders`}>Leaders</Link>*/}
        {/*<Link href={`/countries/${country.tag}/commanders`}>Commanders</Link>*/}
        <h2>History</h2>
        <h2>Alternative Flags</h2>
        <table
          className="bp3-html-table bp3-interactive bp3-html-table-striped"
          width="100%"
        >
          <thead>
            <th style={{ width: 0 }}>Image</th>
            <th style={{ width: "25%" }}>Variant Code</th>
            <th>Possible Country Name</th>
          </thead>
          <tbody>
            {country.flags
              .filter((countryFlag: any) => !!countryFlag.variant)
              .map((countryFlag: any) => {
                return (
                  <tr>
                    <td>
                      <img src={countryFlag.url}></img>
                    </td>
                    <td valign="middle">
                      <code>{countryFlag.variant}</code>
                    </td>
                    <td>
                      {
                        country.names.find(
                          (countryName: any) =>
                            countryName.variant === countryFlag.variant
                        )?.localizedName
                      }
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="col-lg-3">
        <p className="bp3-text-large" style={{ textAlign: "center" }}>
          <strong>{country.localizedDefaultName}</strong>
        </p>
        <Card>
          <div
            className={classNames(styles["country-card__flag"], {
              ["bp3-skeleton"]: !loading,
            })}
            style={{ backgroundImage: `url(${country.flagUrl})` }}
          />
          <br />
          <div className="row">
            <div className="col-sm-4" style={{ textAlign: "right" }}>
              <b>Capital</b>
            </div>
            <div className="col-sm-8">
              <a
                href="#"
                onClick={() => push(`/states/${country.history.capital.id}`)}
              >
                {country.history.capital?.localizedName}
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
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
          flags {
            url
            variant
          }
          names {
            localizedName
            variant
          }
          flagUrl
          name
          localizedDefaultName
          tag
          history {
            popularities {
              ideology {
                id
                name
                color
              }
              value
            }
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

            convoys
            politicalPower
            researchSlots
            stability
            warSupport
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

export default Country;
