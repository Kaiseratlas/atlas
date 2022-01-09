import React from "react";
import {
  Box,
  Button,
  Divider,
  List, ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { gql, useQuery } from "@apollo/client";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { styled } from "@mui/system";

const FlagImage = styled("img")({
  float: "right",
  outline: "1px solid #eaeaea",
});

const Country: React.FC<{ tag: string }> = ({ tag }) => {
  const { data, error, loading } = useQuery(
    gql`
      query Country($tag: String!) {
        country(tag: $tag) {
          tag
          name
          flagUrl
          color
          history {
            capital {
              name
              value
            }
          }
        }
      }
    `,
    { variables: { tag } }
  );
  console.log("data", data);
  return (
    <Box sx={{ width: 400 }}>
      <Box sx={{ p: 2 }}>
        <FlagImage src={data?.country.flagUrl} />
        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          {data?.country.name}
        </Typography>
        <Typography variant="caption" gutterBottom component="div">
          Country
        </Typography>
      </Box>
      <Divider light />
      <List>
        <ListItem>
          <ListItemText>Tag: {data?.country.tag}</ListItemText>
        </ListItem>
        <ListSubheader>Capital</ListSubheader>
        <ListItemButton>
          <ListItemText>{data?.country.history.capital.name}</ListItemText>
          <ListItemSecondaryAction>
            <Button
              variant="text"
              color="inherit"
              startIcon={<StarOutlineIcon />}
            >
              {data?.country.history.capital.value}
            </Button>
          </ListItemSecondaryAction>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Country;
