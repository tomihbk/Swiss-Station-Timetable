import { useSelector } from "react-redux";
import Map from "../components/Map";
import SearchFilter from "../components/SearchFilter";
import Trip from "../components/Trip";
import { ReducerStateType } from "../state";
import { ReactComponent as RefreshIcon } from "../images/refresh.svg";

const Trips = (): React.ReactElement => {
  const trips: any = useSelector((state: ReducerStateType) => state.trip);
  const apiRequest: any = useSelector((state: ReducerStateType) => state.api);

  let lat = 0;
  let lon = 0;
  let stationName = "";
  if (trips.result && trips.result[0]) {
    lat =
      trips.result[0].StopEventResponseContext.location.GeoLocation.latitude;
    lon =
      trips.result[0].StopEventResponseContext.location.GeoLocation.longitude;
    stationName = trips.result[0].RequestedStation.StartPoint;
  }

  return (
    <div className="dark:text-gray-200 font-secondary w-full h-full rounded-2xl">
      {trips.result && trips.result[0] ? (
        <div className="mx-auto">
          <Map
            stationName={
              trips.result[0].StopEventResponseContext.IsItDeparture
                ? `${stationName} | Departures`
                : `${stationName} | Arrivals`
            }
            position={[lat, lon] || [46.94883, 7.43913]}
          />
          <SearchFilter />
          {trips.result.map((item: any) => {
            return <Trip key={item.Id} data={item} />;
          })}
        </div>
      ) : (trips.result?.status === 404 || apiRequest.data === undefined ? "No data found" :
        <div className="text-center">
          <RefreshIcon className='w-40 mx-auto mb-4 animate-spin appearance-none bg-green-600 dark:bg-green-700 p-3 rounded-full text-md text-gray-100 font-bold' />
          <span className="text-xl">Loading...</span>
        </div>


      )}
    </div>
  );
};

export default Trips;
