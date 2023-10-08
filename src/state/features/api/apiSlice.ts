import { createSlice } from "@reduxjs/toolkit";
import { ApiBodyTypeData } from "../../action-types";

const initialState = {
  apiQuery: {} as ApiBodyTypeData
};

const apiSlice = createSlice({
  name: "apiquery",
  initialState,
  reducers: {
    addAPIQuery: (state, action) => {
      state.apiQuery = action.payload;
    },
    updateAPIQuery: (state, action) => {
      state.apiQuery = { ...state.apiQuery, ...action.payload };
    }
  },
});

export const { addAPIQuery, updateAPIQuery } = apiSlice.actions;
export default apiSlice.reducer;
