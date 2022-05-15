import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import client from '../../../../apollo-client';
import CharacterQuery from '../../../../graphql/queries/characters/character-query.graphql';
import React from 'react';
import {
  Checkbox,
  FormGroup,
  InputGroup,
  NumericInput,
} from '@blueprintjs/core';

const CharacterInfo: NextPage<any> = ({ character }) => {
  console.log('character', character);
  const portraitUrl = [
    character.portraits.civilian?.large,
    character.portraits.army?.large,
    character.portraits.navy?.large,
  ].find(Boolean);
  return (
    <>
      <img src={portraitUrl} alt={character.id} />
      <h1 className="bp4-heading">{character.name}</h1>
      <h2 className="bp4-heading">Roles</h2>
      {character.roles.map((role: any) => {
        switch (role.__typename) {
          case 'CountryLeader': {
            return (
              <div className="bp4-running-text">
                <p className="bp4-text-large">
                  <b>Country Leader</b>
                </p>
                <p>
                  <b>Ideology:</b> {role.ideology.name}
                </p>
                <p>
                  <b>Description:</b>
                </p>
                <blockquote className="bp4-blockquote">
                  {role.description}
                </blockquote>
              </div>
            );
          }
          case 'CorpsCommander':
          case 'FieldMarshal': {
            return (
              <div className="bp4-running-text">
                <p className="bp4-text-large">
                  <b>
                    {role.__typename === 'CorpsCommander'
                      ? 'Corps Commander'
                      : 'Field Marshal'}
                  </b>
                </p>
                <p>
                  <b>Skill:</b> {role.skill}
                </p>
                <p>
                  <b>Attack:</b> {role.attackSkill}
                </p>
                <p>
                  <b>Defense:</b> {role.defenseSkill}
                </p>
                <p>
                  <b>Planning:</b> {role.planningSkill}
                </p>
                <p>
                  <b>Logistics:</b> {role.logisticsSkill}
                </p>
              </div>
            );
          }
        }
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, error } = await client.query({
    query: CharacterQuery,
    context: {
      headers: {
        'X-Product-Name': params?.['product-id'],
        'X-Product-Version': '0.20.1',
      },
    },
    variables: {
      id: params?.['character-id'],
    },
  });

  return {
    props: {
      character: data.character,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default CharacterInfo;
