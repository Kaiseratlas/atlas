import React from 'react';
import { InputGroup, MenuItem } from '@blueprintjs/core';
import { useFormik } from 'formik';
import { useLazyQuery } from '@apollo/client';
import SearchQuery from '../graphql/queries/search/search-query.graphql';
import { Suggest } from '@blueprintjs/select';

const SearchSuggest = Suggest.ofType<any>();

const Search: React.FC = () => {
  const [search, { data, loading }] = useLazyQuery(SearchQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });
  const { setFieldValue, values, handleSubmit } = useFormik({
    initialValues: {
      term: '',
    },
    async onSubmit(values) {
      await search({ variables: { term: values.term } });
    },
  });
  React.useEffect(() => {
    console.log('values', values);
    handleSubmit();
  }, [handleSubmit, values]);
  console.log('data', data);
  return (
    <>
      <SearchSuggest
        onQueryChange={(query) => setFieldValue('term', query)}
        inputValueRenderer={() => ''}
        onItemSelect={() => {}}
        items={data?.search ?? []}
        popoverProps={{
          position: 'bottom',
        }}
        itemRenderer={(result) => {
          console.log('result', result);
          switch (result.__typename) {
            case 'Focus': {
              return <MenuItem text={result.name} />;
            }
          }
          return <MenuItem text="erewr" />;
        }}
      />
      {/*<InputGroup*/}
      {/*  //disabled={loading}*/}
      {/*  name="term"*/}
      {/*  placeholder="Search..."*/}
      {/*  leftIcon="search"*/}
      {/*  style={{ minWidth: 300 }}*/}
      {/*  onChange={handleChange}*/}
      {/*/>*/}
    </>
  );
};

export default Search;
