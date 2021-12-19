import React from 'react';
import styles from './CountryList.module.scss';

const CountryList: React.FC = ({ children }) => {
  return (
    <>
      <h1>Lists of countries and territories</h1>
      <div className={styles['country-list']}>{children}</div>
    </>
  );
};

export default CountryList;
