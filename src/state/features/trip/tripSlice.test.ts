import tripSlice, { clearTrips, addTrips } from "./tripSlice";
const dummyTripData = {
  trips: [
    {
      Id: "ID-18ADA71E-90DB-4C3A-9CE0-12F212A11B40",
      StopEventResponseContext: {
        location: {
          id: "8500010",
          name: "Basel SBB",
          GeoLocation: {
            latitude: "47.54741",
            longitude: "7.58956",
          },
        },
        IsItDeparture: true,
      },
      RequestedStation: {
        StartPointRef: "8500010",
        StartPoint: "Basel SBB",
        ServiceDeparture: {
          TimetabledTime: "2023-10-26T20:20:00Z",
          EstimatedTime: "2023-10-26T20:20:00Z",
        },
        ServiceArrival: {},
        IsTripCancelled: false,
        PlannedPlatform: "1",
        OperatingDay: "2023-10-26",
        PublishedLineName: "S1",
        TransportMethod: {
          PtMode: "rail",
          SubMode: "regionalRail",
          TransportName: "Zug",
          TransportShortName: "S",
        },
      },
      Origin: {
        IsAvailable: false,
        ServiceDeparture: {},
        ServiceArrival: {},
      },
      Destination: {
        EndPointRef: "8500305",
        EndPointName: "Frick",
        ServiceDeparture: {},
        ServiceArrival: {
          TimetabledTime: "2023-10-26T20:56:00Z",
          EstimatedTime: "2023-10-26T20:56:00Z",
        },
      },
    },
    {
      Id: "ID-63951695-9DBE-4646-986F-6F6D5827CE55",
      StopEventResponseContext: {
        location: {
          id: "8500010",
          name: "Basel SBB",
          GeoLocation: {
            latitude: "47.54741",
            longitude: "7.58956",
          },
        },
        IsItDeparture: true,
      },
      RequestedStation: {
        StartPointRef: "8500010",
        StartPoint: "Basel SBB",
        ServiceDeparture: {
          TimetabledTime: "2023-10-26T20:23:00Z",
          EstimatedTime: "2023-10-26T20:23:00Z",
        },
        ServiceArrival: {},
        IsTripCancelled: false,
        PlannedPlatform: "10",
        OperatingDay: "2023-10-26",
        PublishedLineName: "IC61",
        TransportMethod: {
          PtMode: "rail",
          SubMode: "interRegionalRailService",
          TransportName: "Zug",
          TransportShortName: "IC",
        },
      },
      Origin: {
        IsAvailable: false,
        ServiceDeparture: {},
        ServiceArrival: {},
      },
      Destination: {
        EndPointRef: "8507492",
        EndPointName: "Interlaken Ost",
        ServiceDeparture: {},
        ServiceArrival: {
          TimetabledTime: "2023-10-26T22:30:00Z",
          EstimatedTime: "2023-10-26T22:30:00Z",
        },
      },
    },
    {
      Id: "ID-0257D6F4-098C-4FBD-A097-97F707EF9850",
      StopEventResponseContext: {
        location: {
          id: "8500010",
          name: "Basel SBB",
          GeoLocation: {
            latitude: "47.54741",
            longitude: "7.58956",
          },
        },
        IsItDeparture: true,
      },
      RequestedStation: {
        StartPointRef: "8500010",
        StartPoint: "Basel SBB",
        ServiceDeparture: {
          TimetabledTime: "2023-10-26T20:31:00Z",
          EstimatedTime: "2023-10-26T20:31:00Z",
        },
        ServiceArrival: {},
        IsTripCancelled: false,
        PlannedPlatform: "16",
        OperatingDay: "2023-10-26",
        PublishedLineName: "S3",
        TransportMethod: {
          PtMode: "rail",
          SubMode: "regionalRail",
          TransportName: "Zug",
          TransportShortName: "S",
        },
      },
      Origin: {
        IsAvailable: true,
        PointRef: "8500126",
        PointName: "Porrentruy",
        ServiceDeparture: {
          TimetabledTime: "2023-10-26T19:10:00Z",
          EstimatedTime: "2023-10-26T19:10:00Z",
        },
        ServiceArrival: {},
      },
      Destination: {
        EndPointRef: "8500218",
        EndPointName: "Olten",
        ServiceDeparture: {},
        ServiceArrival: {
          TimetabledTime: "2023-10-26T21:12:00Z",
          EstimatedTime: "2023-10-26T21:12:00Z",
        },
      },
    },
    {
      Id: "ID-7E5B9B94-1197-4B64-8CAF-C0D001C13604",
      StopEventResponseContext: {
        location: {
          id: "8500010",
          name: "Basel SBB",
          GeoLocation: {
            latitude: "47.54741",
            longitude: "7.58956",
          },
        },
        IsItDeparture: true,
      },
      RequestedStation: {
        StartPointRef: "8500010",
        StartPoint: "Basel SBB",
        ServiceDeparture: {
          TimetabledTime: "2023-10-26T20:37:00Z",
          EstimatedTime: "2023-10-26T20:37:00Z",
        },
        ServiceArrival: {},
        IsTripCancelled: false,
        PlannedPlatform: "17",
        OperatingDay: "2023-10-26",
        PublishedLineName: "S3",
        TransportMethod: {
          PtMode: "rail",
          SubMode: "regionalRail",
          TransportName: "Zug",
          TransportShortName: "S",
        },
      },
      Origin: {
        IsAvailable: true,
        PointRef: "8500218",
        PointName: "Olten",
        ServiceDeparture: {
          TimetabledTime: "2023-10-26T19:48:00Z",
          EstimatedTime: "2023-10-26T19:48:00Z",
        },
        ServiceArrival: {},
      },
      Destination: {
        EndPointRef: "8500126",
        EndPointName: "Porrentruy",
        ServiceDeparture: {},
        ServiceArrival: {
          TimetabledTime: "2023-10-26T21:50:00Z",
          EstimatedTime: "2023-10-26T21:50:00Z",
        },
      },
    },
    {
      Id: "ID-C1659B36-BB1F-4732-9953-49D67B927175",
      StopEventResponseContext: {
        location: {
          id: "8500010",
          name: "Basel SBB",
          GeoLocation: {
            latitude: "47.54741",
            longitude: "7.58956",
          },
        },
        IsItDeparture: true,
      },
      RequestedStation: {
        StartPointRef: "8500010",
        StartPoint: "Basel SBB",
        ServiceDeparture: {
          TimetabledTime: "2023-10-26T20:38:00Z",
        },
        ServiceArrival: {},
        IsTripCancelled: false,
        PlannedPlatform: "35",
        OperatingDay: "2023-10-26",
        PublishedLineName: "TER",
        TransportMethod: {
          PtMode: "rail",
          SubMode: "regionalRail",
          TransportName: "Zug",
          TransportShortName: "TER",
        },
      },
      Origin: {
        IsAvailable: false,
        ServiceDeparture: {},
        ServiceArrival: {},
      },
      Destination: {
        EndPointRef: "8718206",
        EndPointName: "Mulhouse",
        ServiceDeparture: {},
        ServiceArrival: {
          TimetabledTime: "2023-10-26T21:09:00Z",
        },
      },
    },
  ],
};
describe("TRIP_REDUCER", () => {
  test("an empty action", () => {
    const initialState: { trips: any } = undefined;
    const action = { type: "" };
    const state = tripSlice(initialState, action);
    expect(state).toEqual({ trips: {} });
  });

  test("addTrips", () => {
    const initialState: { trips: any } = undefined;
    const action = addTrips(dummyTripData);
    const state = tripSlice(initialState, action);
    expect(state).toEqual({ trips: dummyTripData });
  });

  test("clearTrips", () => {
    const initialState = dummyTripData;
    const action = clearTrips();

    const state = tripSlice(initialState, action);

    expect(state).toEqual({ trips: [] });
  });
});