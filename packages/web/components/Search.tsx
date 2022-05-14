import React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

const Search: React.FC = () => {
  const loading = true;
  return (
    <Autocomplete
      sx={(theme) => ({ width: 300 })}
      // renderOption={}
      loading={true}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      options={[]}
    />
  );
};

export default Search;
