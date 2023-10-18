import { createSlice } from "@reduxjs/toolkit";
import { ApiBodyTypeData } from "../../action-types";

const localStorageAPIRequest = localStorage.getItem("SWISS_TRANSPORT_API_QUERY") ?
JSON.parse(localStorage.getItem("SWISS_TRANSPORT_API_QUERY")): {}

const initialState = {
  apiQuery: localStorageAPIRequest as ApiBodyTypeData
};
const apiSlice = createSlice({
  name: "apiquery",
  initialState,
  reducers: {
    addAPIQuery: (state, action) => {
      state.apiQuery = action.payload;
      localStorage.setItem("SWISS_TRANSPORT_API_QUERY", JSON.stringify(action.payload))
    },
    updateAPIQuery: (state, action) => {
      state.apiQuery = { ...state.apiQuery, ...action.payload };
      localStorage.setItem("SWISS_TRANSPORT_API_QUERY", JSON.stringify(state.apiQuery ))
    }
  },
});

export const { addAPIQuery, updateAPIQuery } = apiSlice.actions;
export default apiSlice.reducer;
