import { ApiBodyTypeData } from "../../action-types";
import apiSlice, { addAPIQuery, updateAPIQuery } from "./apiSlice";

const dummyAPIRequest = {
  apiQuery: {
    RequestorReference: "Swiss Station Timetable",
    RequestCurrentTimeStamp: "2023-10-25T10:15:13Z",
    StopPlaceReference: "8503000",
    NumberOfResult: "10",
    ArrivalOrDepature: "departure",
    ArrivalOrDepatureTime: "2023-10-25T12:15:13",
    EnableRealTimeData: "true",
    IncludePreviousCalls: "true",
    IncludeOnwardCalls: "true",
  },
};

describe("API_REDUCER", () => {
  test("an empty action", () => {
    const initialState: { apiQuery: ApiBodyTypeData } = undefined;
    const action = { type: "" };
    const state = apiSlice(initialState, action);
    expect(state).toEqual({ apiQuery: {} });
  });
  test("addAPIQuery", () => {
    const initialState: { apiQuery: ApiBodyTypeData } = undefined;
    const action = addAPIQuery(dummyAPIRequest);
    const state = apiSlice(initialState, action);
    expect(state).toEqual({ apiQuery: dummyAPIRequest });
  });

  test("updateAPIQuery", () => {
    const initialState: { apiQuery: ApiBodyTypeData } = dummyAPIRequest;
    const action = updateAPIQuery({
      NumberOfResult: "5",
      ArrivalOrDepature: "arrival",
    });

    const state = apiSlice(initialState, action);

    expect(state).toEqual({
      apiQuery: {
        RequestorReference: "Swiss Station Timetable",
        RequestCurrentTimeStamp: "2023-10-25T10:15:13Z",
        StopPlaceReference: "8503000",
        NumberOfResult: "5",
        ArrivalOrDepature: "arrival",
        ArrivalOrDepatureTime: "2023-10-25T12:15:13",
        EnableRealTimeData: "true",
        IncludePreviousCalls: "true",
        IncludeOnwardCalls: "true",
      },
    });
  });
});
