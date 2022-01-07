import { NextPage } from "next";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { SVGMap } from "react-svg-map";
// @ts-ignore
import m from "../common/test";
import styles from "./map.module.scss";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { styled } from "@mui/system";

const Path = styled("path")({
  fill: "#e0e0e0",
  stroke: "#e0e0e0",
  strokeWidth: "0.5px",
  ":hover": {
    fill: "#e9e9e9",
    stroke: "#e9e9e9",
  },
});

const WorldMap: NextPage<{ ideologies: any[] }> = ({ ideologies }) => {
  const { data, loading, error } = useQuery(gql`
    query Map {
      countries {
        tag
        name
        color
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

  const r = React.useCallback(() => {
    if (!data) {
      return null;
    }

    const provincesMap = new Map(data.provinces.map((p) => [p.id, p]));
    const cMap = new Map(data.countries.map((c) => [c.tag, c]));
    //console.log("11", data.states);

    const countriesMap = new Map();
    data.states.forEach((state: any) => {
      if (!countriesMap.has(state.history.ownerTag)) {
        countriesMap.set(state.history.ownerTag, []);
      }
      const states = countriesMap.get(state.history.ownerTag);
      countriesMap.set(state.history.ownerTag, [...states, state]);
    });

    console.log("countriesMap", countriesMap);

    return Array.from(countriesMap).map(([countryTag, states]) => {
      console.log("states", states);
      return (
        <g key={`country-${countryTag.toLowerCase()}`} data-role="country">
          {states.map((s: any) => {
            const d = s.provinces.map((pid: any) => {
              const p = provincesMap.get(pid);
              if (p.type !== "LAND") {
                return "";
              }
              return p.path;
            });

            return (
              <Path
                key={s.id}
                data-id={s.id}
                d={d.join(" ")}
                onClick={() => {
                  console.log(s);
                }}
                style={{
                  fill: (cMap.get(countryTag) as any).color,
                  stroke: (cMap.get(countryTag) as any).color,
                }}
              />
            );
          })}
        </g>
      );
    });
  }, [data]);

  return (
    <div>
      <TransformWrapper
        // initialScale={1}
        initialPositionX={-2000}
        initialPositionY={0}
        // maxPositionX={0}
        // maxPositionY={0}
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
                maxWidth: "100%",
                maxHeight: "calc(100vh - 50px)",
              }}
            >
              <>
                <svg
                  width="5632"
                  height="2048"
                  //xmlns="http://www.w3.org/2000/svg"
                  style={{
                    shapeRendering: "optimizeSpeed",
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
