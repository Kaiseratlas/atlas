import React from 'react';
import styles from './CountryList.module.scss';

const CountryList: React.FC = ({ children }) => {
  return (
    <>

      <div className={styles['country-list']}>{children}</div>
    </>
  );
};

export default CountryList;
