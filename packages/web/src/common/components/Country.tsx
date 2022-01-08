import React from "react";
import { Box, Typography } from "@mui/material";

const Country: React.FC = ({ tag, countries }) => {
  const country = countries.find((c) => c.tag === tag);
  return (
    <Box sx={{ width: 400 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          {country.name}
        </Typography>
        <Typography variant="caption" gutterBottom component="div">
          Country
        </Typography>
      </Box>
    </Box>
  );
};

export default Country;
