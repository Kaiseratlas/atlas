import { NextPage } from "next";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Drawer, Typography } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { styled } from "@mui/system";
import Color from "color";
import StateInfo from "../common/components/StateInfo";
import Country from "../common/components/Country";
import Router from 'next/router';

const Path = styled("path")({
  transition: "0.25s",
});

const WorldMap: NextPage = () => {
  const { data, loading, error } = useQuery(gql`
    query Map {
      countries {
        tag
        name
        color
        flagUrl
      }
      states {
        id
        name
        provinces
        history {
          ownerTag
        }
      }
      provinces {
        id
        type
        coastal
        terrain
        continentId
        red
        blue
        green
        path
      }
    }
  `);

  const [openw, setOpen] = React.useState(false);
  const [currentState, setCurrentState] = React.useState<any | null>(null);
  const [currentCountry, setCurrentCountry] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (!!currentCountry) {
      setCurrentState(null);
    }
  }, [currentCountry]);

  const r = React.useCallback(() => {
    if (!data) {
      return null;
    }

    const provincesMap = new Map(data.provinces.map((p: any) => [p.id, p]));
    const cMap = new Map(data.countries.map((c: any) => [c.tag, c]));

    const countriesMap = new Map();
    data.states.forEach((state: any) => {
      if (!countriesMap.has(state.history.ownerTag)) {
        countriesMap.set(state.history.ownerTag, []);
      }
      const states = countriesMap.get(state.history.ownerTag);
      countriesMap.set(state.history.ownerTag, [...states, state]);
    });

    return Array.from(countriesMap).map(([countryTag, states]) => {
      //console.log("states", states);
      const country = cMap.get(countryTag) as any;
      return (
        <g
          key={`country-${countryTag.toLowerCase()}`}
          data-id={country.id}
          data-tag={country.tag}
          data-role="country"
        >
          {states.map((s: any) => {
            const d = s.provinces.map((pid: any) => {
              const p = provincesMap.get(pid) as any;
              if (p.type !== "LAND") {
                return "";
              }
              return p.path;
            });

            const color = Color((cMap.get(countryTag) as any).color);

            const hoverColor = color.isDark()
              ? color.lighten(0.2).hex()
              : color.darken(0.2).hex();

            return (
              <Path
                key={s.id}
                data-id={s.id}
                d={d.join(" ")}
                onClick={() => {
                  console.log(s);
                  setOpen(true);
                  setCurrentState(s);
                }}
                sx={{
                  fill: color.hex(),
                  stroke: color.hex(),
                  ":hover": {
                    fill: hoverColor,
                    stroke: hoverColor,
                  },
                }}
                style={
                  {
                    //stroke: 'white',
                    // filter: `drop-shadow( 0px 0px 10px ${
                    //   (cMap.get(countryTag) as any).color
                    // })`,
                  }
                }
              />
            );
          })}
        </g>
      );
    });
  }, [data]);

  return (
    <div>
      <Drawer
        // anchor={anchor}
        open={openw}
        onClose={(event, reason) => {
          setOpen(false);
          setCurrentState(null);
          setCurrentCountry(null);
        }}
      >
        {currentState && (
          <StateInfo
            state={currentState}
            countries={data.countries}
            setCurrentCountry={setCurrentCountry}
          />
        )}
        {currentCountry && (
          <Country tag={currentCountry} />
        )}
      </Drawer>
      <TransformWrapper
        // initialScale={1}
        initialPositionX={-2000}
        initialPositionY={0}
        // maxPositionX={0}
        // maxPositionY={0}
        // onPanning={(ref, event) => {
        //   const { state } = ref;
        // }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              {/*<button onClick={() => zoomIn()}>+</button>*/}
              {/*<button onClick={() => zoomOut()}>-</button>*/}
              {/*<button onClick={() => resetTransform()}>x</button>*/}
            </div>
            <TransformComponent
              wrapperStyle={{
                position: 'fixed',
                top: 0,
                left: 0,
                maxWidth: "100%",
                maxHeight: "100vh",
              }}
            >
              <>
                <svg
                  width="5632"
                  height="2048"
                  //xmlns="http://www.w3.org/2000/svg"
                  style={{
                    shapeRendering: "optimizeSpeed",
                    background: "#42bfed",
                  }}
                >
                  {r()}
                </svg>
              </>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export default WorldMap;
