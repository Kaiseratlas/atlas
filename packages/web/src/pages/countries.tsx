import { NextPage } from "next";
import client from "../../client";
import { gql } from "@apollo/client";
import CountryCard from "../common/components/CountryCard";
import CountryList from "../common/components/CountryList";

const Countries: NextPage<{ countries: any[] }> = ({ countries }) => {
  return (
    <div className="row">
      <div className="col-lg-9">
        <CountryList>
          {countries.map((country) => (
            <CountryCard
              key={`country-tag-${country.tag.toLowerCase()}`}
              country={country}
            />
          ))}
        </CountryList>
      </div>

      <div className="col-lg-3">1 of 2</div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
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
}

export default Countries;
