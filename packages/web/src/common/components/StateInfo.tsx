import React from "react";
import {
  Box,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  ListItemButton,
  Backdrop,
  CircularProgress,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { styled } from "@mui/system";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { Alert } from "@mui/lab";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

const FlagImage = styled("img")({
  outline: "2px solid #e7e7e7",
  width: 36,
});

const StateInfo: React.FC<{
  state: any;
  countries: any[];
  setCurrentCountry: any;
}> = ({ state, countries, setCurrentCountry }) => {
  const { data, loading, error } = useQuery(
    gql`
      query State($id: Float!, $tag: String!) {
        state(id: $id) {
          id
          name
          provinces
          manpower
          history {
            ownerTag
            claims
            cores
          }
        }
        country(tag: $tag) {
          tag
          name
          flagUrl
          color
        }
      }
    `,
    { variables: { id: Number(state?.id), tag: state?.history.ownerTag } }
  );

  return (
    <Box sx={{ width: 400 }}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          {data?.state.name}
        </Typography>
        <Typography variant="caption" gutterBottom component="div">
          State
        </Typography>
      </Box>
      <Divider light />
      <List>
        <ListSubheader>Info</ListSubheader>
        <ListItemButton>
          <ListItemIcon>
            <FamilyRestroomIcon />
          </ListItemIcon>
          <ListItemText>
            Population: {data?.state.manpower.toLocaleString()}
          </ListItemText>
        </ListItemButton>
      </List>
      <List>
        <ListSubheader>Owner</ListSubheader>
        <ListItemButton
          onClick={() => setCurrentCountry(data?.state.history.ownerTag)}
        >
          <ListItemIcon>
            <FlagImage src={data?.country.flagUrl} />
          </ListItemIcon>
          <ListItemText
            secondary={
              data?.state.history.cores.includes(data?.state.history.ownerTag)
                ? "Core Territory"
                : "Non-Core Territory"
            }
          >
            {data?.country.name}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton>
              <ReadMoreIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemButton>
        {!!data?.state.history.claims.length && (
          <ListSubheader>Claims</ListSubheader>
        )}
        {data?.state.history.claims.map((tag: any) => {
          const country = countries.find((c) => c.tag === tag);
          console.log("data?.state.history.cores", data?.state.history.cores);
          return (
            <ListItemButton onClick={() => setCurrentCountry(tag)}>
              <ListItemIcon>
                <FlagImage src={country.flagUrl} />
              </ListItemIcon>
              <ListItemText
                secondary={
                  data?.state.history.cores.includes(tag)
                    ? "Core Territory"
                    : "Country has a claim"
                }
              >
                {country.name}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton>
                  <ReadMoreIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default StateInfo;
