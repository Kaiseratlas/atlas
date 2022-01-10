import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "./store";

export interface MapState {
  stateId: number | null;
  countryTag: string | null;
}

const initialState: MapState = {
  stateId: null,
  countryTag: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    selectState: (state, action: PayloadAction<number | null>) => {
      state.stateId = action.payload;
    },
    selectCountry: (state, action: PayloadAction<string | null>) => {
      state.countryTag = action.payload;
    },
  },
});

export const { selectCountry, selectState } = mapSlice.actions;

export default mapSlice.reducer;
