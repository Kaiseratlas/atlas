import { GetStaticProps, NextPage } from "next";
import client from "../../client";
import { gql } from "@apollo/client";
import CountryCard from "../common/components/CountryCard";
import CountryList from "../common/components/CountryList";
import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  ButtonGroup,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const Countries: NextPage<{ countries: any[] }> = ({ countries }) => {
  const characters = Array(26)
    .fill("")
    .map((_, i) => String.fromCharCode("A".charCodeAt(0) + i));

  const [chars, setChars] = useState<string[]>([]);
  const [selectedChars, setSelectedChars] = useState<string[]>([]);

  useEffect(() => {
    setChars(
      Array.from(
        new Set(
          countries.map((country) => country.name[0].toUpperCase()).sort()
        )
      )
    );
  }, [countries]);

  console.log("chars", chars);

  const alphabetMap = new Map();

  countries.forEach((country) => {
    const ch = country.name[0].toUpperCase();
    if (!alphabetMap.has(ch)) {
      alphabetMap.set(ch, []);
    }

    const countries = alphabetMap.get(ch);
    countries.push(country);
  });

  console.log("selectedChars", selectedChars);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              label="Age"
              //onChange={handleChange}
              variant="standard"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h3" component="div" gutterBottom>
            Lists of countries and territories
          </Typography>
          <ButtonGroup fullWidth>
            {characters.map((ch) => (
              <Button
                key={`char-${ch}`}
                color={selectedChars.has(ch) ? "secondary" : "primary"}
                disabled={!chars.has(ch)}
                onClick={() => {
                  console.log("selectedChars.add(ch)", selectedChars.add(ch));
                  setSelectedChars(selectedChars.add(ch));
                }}
              >
                {ch}
              </Button>
            ))}
          </ButtonGroup>
          <br />
          <br />
          <br />
          <Box component="main">
            {Array.from(alphabetMap)
              .sort((a, b) => b[0] - a[0])
              .map(([ch, countries]) => {
                return (
                  <React.Fragment key={ch}>
                    <Typography variant="h4" component="div" gutterBottom>
                      {ch}
                    </Typography>
                    <ImageList cols={5}>
                      {countries.map((country: any) => (
                        <ImageListItem
                          key={country.tag}
                          style={{ alignItems: "center" }}
                        >
                          <img
                            src={country.flagUrl}
                            loading={"lazy"}
                            style={{
                              width: 82,
                              height: 52,
                              outline: "1px solid #eaeaea",
                            }}
                          />
                          <ImageListItemBar
                            title={country.name}
                            style={{ textAlign: "center", padding: "7px 0" }}
                            position="below"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </React.Fragment>
                );
              })}
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          tag
          name
          flagUrl
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries,
    },
  };
};

export default Countries;
