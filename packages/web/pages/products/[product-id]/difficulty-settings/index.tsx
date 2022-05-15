import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import DifficultySettingsQuery from '../../../../graphql/queries/difficulty-settings/difficulty-settings-query.graphql';

const DifficultySettings: NextPage<any> = () => {
  return (
    <>
      <h1 className="bp4-heading">Difficulty Settings</h1>
    </>
  );
};

export default DifficultySettings;
