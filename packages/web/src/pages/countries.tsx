import { GetStaticProps, NextPage } from "next";
import client from "../../client";
import { gql } from "@apollo/client";
import CountryCard from "../common/components/CountryCard";
import CountryList from "../common/components/CountryList";
import { Button, ButtonGroup } from "@blueprintjs/core";
import React from "react";

const Countries: NextPage<{ countries: any[] }> = ({ countries }) => {
  const characters = Array(26)
    .fill("")
    .map((_, i) => String.fromCharCode("A".charCodeAt(0) + i));

  const alphabetMap = new Map();

  countries.forEach((country) => {
    const ch = country.name[0].toUpperCase();
    if (!alphabetMap.has(ch)) {
      alphabetMap.set(ch, []);
    }

    const countries = alphabetMap.get(ch);
    countries.push(country);
  });

  return (
    <div className="row">
      <div className="col-lg-9">
        <h1>Lists of countries and territories</h1>
        <ButtonGroup fill>
          {characters.map((ch) => (
            <Button>{ch}</Button>
          ))}
        </ButtonGroup>
        <br />
        <br />
        <br />
        {Array.from(alphabetMap).sort((a, b) => b[0] - a[0]).map(([ch, countries]) => {
          return (
            <React.Fragment key={ch}>
              <h2>{ch}</h2>
              <CountryList>
                {countries.map((country: any) => (
                  <CountryCard
                    key={`country-tag-${country.tag.toLowerCase()}`}
                    country={country}
                  />
                ))}
              </CountryList>
            </React.Fragment>
          );
        })}
      </div>

      <div className="col-lg-3"></div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          tag
          name
          flagUrl
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries,
    },
  };
};

export default Countries;
