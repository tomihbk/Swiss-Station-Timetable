import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trips: {},
  size: 14445,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    addTrips: (state, action) => {
      state.trips = action.payload;
      console.log("tripslice",action.payload)
    },
    clearTrips: (state) => {
      state.trips = [];
    },
  },
});
// console.log(tripSlice);

export const { clearTrips, addTrips } = tripSlice.actions;
export default tripSlice.reducer;
