import { AxiosResponse } from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { ApiBodyTypeData } from "../state/action-types";
import apiCaller from "../util/apiCaller";
import SuggestedStation from "./SuggestedStation";
import { addAPIQuery } from "../state/features/api/apiSlice";
import { addTrips } from "../state/features/trip/tripSlice";

const stationsList = [
  {
    id: "8507000",
    stationName: "Bern",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof_Bern.jpg?q=45"
  },
  {
    id: "8500010",
    stationName: "Basel SBB",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof_BaselSBB.jpg?q=45"
  },
  {
    id: "8501008",
    stationName: "Genève",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof-Genf.jpg?q=45"
  },
  {
    id: "8501120",
    stationName: "Lausanne",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof-Lausanne.jpg?q=45"
  },
  {
    id: "8503000",
    stationName: "Zürich HB",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Zuerich-HB.jpg?q=45"
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
    dispatch(addAPIQuery(apiBodyData))
    history.push("/trips");
  }

  return <div className="relative flex flex-wrap justify-center opacity-100 z-10 dark:opacity-90">
    {stationsList.map((station, index) => <SuggestedStation key={index} title={station.stationName} imageUrl={station.imageUrl} onClick={() => showTrips(station.id)} />)}
  </div>;
};

export default SuggestedStationsList;
