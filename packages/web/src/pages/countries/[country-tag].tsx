import { GetStaticPaths, NextPage } from "next";
import client from "../../../client";
import { gql } from "@apollo/client";
import { Card } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "../../common/components/CountryCard.module.scss";

const Country: NextPage<{ country: any }> = ({ country }) => {
  console.log("country", country);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const flag = new Image();
    flag.src = country.flagUrl;
    flag.onload = () => setLoading(true);
  }, []);

  return (
    <div className="row">
      <div className="col-lg-9">
        <h1>name</h1>
        <h2>Politics</h2>
        <h2>History</h2>
        <h2>Possible Flags</h2>
      </div>
      <div className="col-lg-3">
        <Card>
          <div
            className={classNames(styles["country-card__flag"], {
              ["bp3-skeleton"]: !loading,
            })}
            style={{ backgroundImage: `url(${country.flagUrl})` }}
          />
          <dl>
            <dt>Beast of Bodmin</dt>
            <dd>A large feline inhabiting Bodmin Moor.</dd>

            <dt>Morgawr</dt>
            <dd>A sea serpent.</dd>

            <dt>Owlman</dt>
            <dd>A giant owl-like creature.</dd>
          </dl>
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

export async function getStaticProps({ locale }) {
  const { data } = await client.query({
    query: gql`
      query Country {
        country(tag: "AFG") {
          flagUrl
          name
          tag
        }
      }
    `,
  });

  return {
    props: {
      country: data.country,
    },
  };
}

export default Country;
