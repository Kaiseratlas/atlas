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

const WorldMap: NextPage<{ ideologies: any[] }> = ({ ideologies }) => {
  const { data, loading, error } = useQuery(gql`
    query Map {
      locations {
        id
        path
        name
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
      }
    }
  `);

  const r = React.useCallback(() => {
    const provincesMap = new Map();
    data.provinces.forEach((p) => provincesMap.set(p.id, p));
    return (
      <SVGMap
        className={styles.map}
        locationClassName={styles.location}
        locationRole="province"
        map={{
          locations: data.locations,
          // locations: data.locations.filter((x) => {
          //   const p = provincesMap.get(x.id);
          //   //console.log("p", p);
          //   return p.type === "LAND";
          // }),
          viewBox: `0 0 5632 2048`,
        }}
        onLocationClick={(args) => {
          console.log(args.target.id);
        }}
      />
    );
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <TransformWrapper
        initialScale={3}
        initialPositionX={-2000}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent
              contentStyle={{
                width: "1900px",
                height: "100vh",
              }}
            >
              {r()}
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export default WorldMap;
