import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as RefreshIcon } from "../images/refresh.svg";
import HomeButton from "../components/HomeButton";
import Map from "../components/Map";
import SearchFilter from "../components/SearchFilter";
import Trip from "../components/Trip";
import apiCaller from "../util/apiCaller";
import { AxiosResponse } from "axios";
import { addTrips, clearTrips } from "../state/features/trip/tripSlice";
import { useDispatch } from "react-redux";

const Trips = (): React.ReactElement => {
  const dispatch = useDispatch();
  const {trips}: any = useSelector((store: any) => store.trip);
  const {apiQuery}: any = useSelector((store: any) => store.apiquery);

  console.log(trips, apiQuery)

  useEffect(() => {
    window.scroll(0,0)
    
    const fetchTrips = async ()=>{
      await apiCaller(apiQuery, (res: AxiosResponse) => {
        dispatch(clearTrips())
        dispatch(addTrips(res.data))
      }, (err: AxiosResponse) => {
        console.log(err);
      })
    }
    // This checks if apiQuery is not empty before running the apirequest
    if(Object.getOwnPropertyNames(apiQuery).length != 0){
      fetchTrips()
    }
  }, [])

  let lat = 0;
  let lon = 0;
  let stationName = "";
  if (trips && trips[0]) {
    lat =
      trips[0].StopEventResponseContext.location.GeoLocation.latitude;
    lon =
      trips[0].StopEventResponseContext.location.GeoLocation.longitude;
    stationName = trips[0].RequestedStation.StartPoint;
  }

  return (
    <div className="dark:text-gray-200 font-secondary w-full h-full rounded-2xl">
      <HomeButton/>
      {trips && trips[0] ? (
        <div className="mx-auto">
          <Map
            stationName={
              trips[0].StopEventResponseContext.IsItDeparture
                ? `${stationName} | Departures`
                : `${stationName} | Arrivals`
            }
            position={[lat, lon]}
          />
          <SearchFilter />
          {trips.map((item: any) => {
            return <Trip key={item.Id} data={item} />;
          })}
        </div>
      ) : (trips?.status === 404 || Object.getOwnPropertyNames(apiQuery).length === 0 ? "No data found" :
        <div className="text-center">
          <RefreshIcon className='w-40 mx-auto mb-4 animate-spin appearance-none bg-green-600 dark:bg-green-700 p-3 rounded-full text-md text-gray-100 font-bold' />
          <span className="text-xl">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Trips;
