import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { ApiBodyTypeData } from "../state/action-types";
import SuggestedStation from "./SuggestedStation";
import { addAPIQuery } from "../state/features/api/apiSlice";
import { clearTrips } from "../state/features/trip/tripSlice";

import { Bern, BaselSBB, Geneve, Lausanne, ZurichHB } from "../images/main-stations";

const stationsList = [
  {
    id: "8507000",
    stationName: "Bern",
    imageUrl: Bern
  },
  {
    id: "8500010",
    stationName: "Basel SBB",
    imageUrl: BaselSBB
  },
  {
    id: "8501008",
    stationName: "Genève",
    imageUrl: Geneve
  },
  {
    id: "8501120",
    stationName: "Lausanne",
    imageUrl: Lausanne
  },
  {
    id: "8503000",
    stationName: "Zürich HB",
    imageUrl: ZurichHB
  },
];

const SuggestedStationsList = (): React.ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const apiBodyData: ApiBodyTypeData = {
    RequestorReference: "Swiss Station Timetable",
    RequestCurrentTimeStamp: moment.utc().format(),
    StopPlaceReference: "",
    NumberOfResult: "10",
    ArrivalOrDepature: "departure",
    ArrivalOrDepatureTime: moment().format("YYYY-MM-DDTHH:mm:ss"),
    EnableRealTimeData: "true",
    IncludePreviousCalls: "true",
    IncludeOnwardCalls: "true",
  }

  const showTrips = (id:string) => {
    apiBodyData.StopPlaceReference = id
    dispatch(clearTrips())
    dispatch(addAPIQuery(apiBodyData))
    history.push("/trips");
  }

  return <div className="relative flex flex-wrap justify-center opacity-100 z-10 dark:opacity-90">
    {stationsList.map((station, index) => <SuggestedStation key={index} title={station.stationName} imageUrl={station.imageUrl} onClick={() => showTrips(station.id)} />)}
  </div>;
};

export default SuggestedStationsList;
