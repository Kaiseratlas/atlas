import { GetStaticProps, NextPage } from "next";
import client from "../../client";
import { gql } from "@apollo/client";
import Countries from "./countries";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Select,
  Typography,
  FormControl,
  MenuItem,
} from "@mui/material";
import React from "react";

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

  const [selectedIdeologies, setSelectedIdeologies] = React.useState<string[]>(
    []
  );

  const handleChange = React.useCallback((e) => {
    console.log("e", e);
  });

  // @ts-ignore
  return (
    <Grid container spacing={2}>
      <Grid item lg={3}>
        <FormControl fullWidth>
          <InputLabel id="ideologies-checkbox-label">Ideologies</InputLabel>
          <Select
            labelId="ideologies-checkbox-label"
            id="ideologies-checkbox"
            multiple
            value={ideologies}
            onChange={handleChange}
            input={<OutlinedInput label="Ideology" />}
            // renderValue={(selected: any) => {
            //   console.log('selected', selected)
            //   return selected.name.join(', ');
            // }}
          >
            {ideologies.map((name) => (
              <MenuItem key={name} value={name.id}>
                <Checkbox />
                <ListItemText primary={name.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={9}>
        <Typography variant="h3" component="h1" gutterBottom>
          Political Ideologies
        </Typography>
        {Array.from(ideologiesMap).map(([, ideologies]) => {
          return ideologies.map((ideology: any) => {
            console.log("ideology", ideology);
            return (
              <div key={`ideology-${ideology.name}`}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {ideology.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <Typography paragraph>{ideology.description}</Typography>
                </Typography>
              </div>
            );
          });
        })}
      </Grid>
    </Grid>
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
          grouping
          description
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
