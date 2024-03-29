import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trips: {}
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    addTrips: (state, action) => {
      state.trips = action.payload;
    },
    clearTrips: (state) => {
      state.trips = [];
    },
  },
});
// console.log(tripSlice);

export const { clearTrips, addTrips } = tripSlice.actions;
export default tripSlice.reducer;
