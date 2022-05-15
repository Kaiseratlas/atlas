import React from 'react';
import { InputGroup } from '@blueprintjs/core';

const Search: React.FC = () => {
  return (
    <InputGroup
      placeholder="Search..."
      leftIcon="search"
      style={{ minWidth: 300 }}
    />
  );
};

export default Search;
