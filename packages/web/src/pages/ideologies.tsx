import { GetStaticProps, NextPage } from "next";
import client from "../../client";
import { gql } from "@apollo/client";
import Countries from "./countries";

const Ideologies: NextPage<{ ideologies: any[] }> = ({ ideologies }) => {
  const ideologiesMap = new Map();

  ideologies.forEach((ideology) => {
    if (!ideologiesMap.has(ideology.grouping)) {
      ideologiesMap.set(ideology.grouping, []);
    }
    const grouping = ideologiesMap.get(ideology.grouping);
    grouping.push(ideology);
    ideologiesMap.set(ideology.grouping, grouping);
  });

  return (
    <div className="row">
      <div className="col-lg-9">
        <h1>Political Ideologies</h1>
        {Array.from(ideologiesMap).map(([, ideologies]) => {
          return ideologies.map((ideology: any) => {
            console.log("ideology", ideology);
            return (
              <div key={`ideology-${ideology.name}`}>
                <h2>{ideology.localizedName}</h2>
                <p className="bp3-running-text">
                  {ideology.localizedDescription}
                </p>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Ideologies {
        ideologies {
          id
          color
          name
          localizedName
          localizedGrouping
          localizedDescription
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
};

export default Ideologies;
