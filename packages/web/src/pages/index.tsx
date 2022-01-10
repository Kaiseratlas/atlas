import { NextPage } from "next";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { Drawer } from "@mui/material";
import { batch, useDispatch, useSelector } from "react-redux";
import type { AppState } from "../common/store";
import { MapState, selectState, selectCountry } from "../common/mapSlice";
import Country from "../common/components/Country";

const MapStage = dynamic(() => import("../common/components/MapStage"), {
  ssr: false,
});

const WorldMap: NextPage = () => {
  const { stateId, countryTag } = useSelector<AppState, MapState>(
    (state) => state.map
  );
  const dispatch = useDispatch();
  // console.log("countryTag", countryTag);
  // console.log("stateId", stateId);
  return (
    <>
      <Drawer
        // anchor={anchor}
        open={!!stateId || !!countryTag}
        onClose={() => {
          batch(() => {
            dispatch(selectState(null));
            dispatch(selectCountry(null));
          });
        }}
      >
        {/*{currentState && (*/}
        {/*  <StateInfo*/}
        {/*    state={currentState}*/}
        {/*    countries={data.countries}*/}
        {/*    setCurrentCountry={setCurrentCountry}*/}
        {/*  />*/}
        {/*)}*/}
        {countryTag && <Country tag={countryTag} />}
      </Drawer>

      <MapStage
        scale={1.5}
        onCountryClick={(countryTag: any) => {
          dispatch(selectCountry(countryTag));
        }}
        onLocationClick={(stateId: any) => {
          dispatch(selectState(stateId));
        }}
      />
    </>
  );
};

export default WorldMap;
