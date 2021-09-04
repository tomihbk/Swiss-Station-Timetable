import { useSelector } from "react-redux";
import Map from "../components/Map";
import Trip from "../components/Trip";
import { ReducerStateType } from "../state";

const Result = (): React.ReactElement => {
  const trips: any = useSelector((state: ReducerStateType) => state.trip);
  let lat = 0;
  let lon = 0;
    let stationName = "";
    console.log(trips.status)
  if (trips.status == undefined && trips.status != 404) {
    lat =
      trips[0].result.StopEventResponseContext.location.GeoLocation.latitude;
    lon =
      trips[0].result.StopEventResponseContext.location.GeoLocation.longitude;
    stationName = trips[0].result.StopEventResponseContext.location.name;
  }
  console.log(trips);
  return (
    <div className=" dark:text-gray-200 font-secondary w-full h-full rounded-2xl">
      {trips.status == undefined && trips.status != 404 ? (
        <div className="mx-auto">
          <Map
            stationName={ trips[0].result.StopEventResponseContext.IsItDeparture ? `${stationName} depatures` : `${stationName} arrivals`}
            position={[lat, lon] || [46.94883, 7.43913]}
          />
          {Object.values(trips).map((item: any, i) => {
            return <Trip key={item.result.Id} data={item.result} />;
          })}
        </div>
      ) : (
        <h1>No data for the selected station found</h1>
      )}
    </div>
  );
};

export default Result;
