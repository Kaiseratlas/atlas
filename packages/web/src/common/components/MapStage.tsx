import React, { FC, useCallback, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Layer, Stage, Path, useStrictMode } from "react-konva";
import Color from "color";

useStrictMode(true);

const LocationPath: FC<{
  data: string;
  state: any;
  country: any;
  onClick: any;
}> = ({ data, state, country, onClick }) => {
  const [color, setColor] = useState(new Color(country.color));

  const handleMouseOver = useCallback(() => {
    setColor(color.isDark() ? color.lighten(0.2) : color.darken(0.2));
  }, []);

  return (
    <Path
      data={data}
      fill={color.hex()}
      stroke={color.hex()}
      strokeWidth={0.5}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={() => {
        setColor(Color(country.color));
      }}
    />
  );
};

const MapStage: FC<{
  scale: number;
  onLocationClick: any;
  onCountryClick: any;
}> = ({ scale, onLocationClick, onCountryClick }) => {
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

  if (!data) {
    return null;
  }

  const countriesMap = new Map(data.countries.map((c: any) => [c.tag, c]));
  const statesMap = new Map(data.states.map((s: any) => [s.id, s]));
  const provincesMap = new Map(data?.provinces.map((p: any) => [p.id, p]));

  return (
    <Stage
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        background: "#42bfed",
      }}
      draggable
      width={window.innerWidth}
      height={window.innerHeight}
      offset={{
        x: 2300,
        y: 200,
      }}
      scale={{
        x: scale,
        y: scale,
      }}
    >
      <Layer>
        {Array.from(statesMap.values()).map((s: any) => {
          const country = countriesMap.get(s.history.ownerTag);
          const data = s.provinces
            .map((provinceId: string) => {
              const province = provincesMap.get(provinceId) as any;
              return province.path;
            })
            .join(" ");
          return (
            <LocationPath
              state={s}
              key={s.id}
              data={data}
              country={country}
              onClick={() => {
                onLocationClick(s.id);
                // @ts-ignore
                onCountryClick(country.tag);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default MapStage;
