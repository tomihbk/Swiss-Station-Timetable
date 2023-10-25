import moment from "moment";
import TransportIcon from "./TransportIcon";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Trip = ({ data }: any): React.ReactElement => {

  let deltaBetweenTimetableEstimatedDeparture = 0
  let deltaBetweenTimetableEstimatedArrival = 0

  const totalTripDuration = (): string => {
    const fullTripDurationMinutes = moment(data.Destination.ServiceArrival.TimetabledTime).diff(data.Origin.ServiceDeparture.TimetabledTime,"m")
    const tripHour = Math.floor(fullTripDurationMinutes / 60)
    const tripMinute = fullTripDurationMinutes % 60
    return tripHour == 0 ? `${tripMinute} min` :
    tripMinute == 0 ? `${tripHour} h` :
    `${tripHour} h ${tripMinute} min`
  }
  
  if (Object.prototype.hasOwnProperty.call(data.RequestedStation.ServiceDeparture, "EstimatedTime")) {

    const timetableDeparture = moment(data.RequestedStation.ServiceDeparture.TimetabledTime);
    const estimatedDeparture = moment(data.RequestedStation.ServiceDeparture.EstimatedTime);

    deltaBetweenTimetableEstimatedDeparture = estimatedDeparture.diff(timetableDeparture, 'minutes')
  }

  if (Object.prototype.hasOwnProperty.call(data.RequestedStation.ServiceArrival, "EstimatedTime")) {

    const timetableArrival = moment(data.RequestedStation.ServiceArrival.TimetabledTime);
    const estimatedArrival = moment(data.RequestedStation.ServiceArrival.EstimatedTime);

    deltaBetweenTimetableEstimatedArrival = estimatedArrival.diff(timetableArrival, 'minutes')
  }

  return (
    <div className={`bg-white p-3 pl-1 pt-4 md:pb-1 md:px-0 dark:bg-gray-700 ${data.RequestedStation.IsTripCancelled && "border-2 border-red-600 border-dotted"} mx-auto w-5/6 md:w-4/6 flex flex-col filter drop-shadow-md rounded-xl text-sm my-5`}>
      <div className="grid grid-cols-4 md:grid-cols-6 md:mb-2">
        <div className="direction col-span-4 md:col-span-6 mx-auto mb-3 text-lg md:text-2xl font-bold font-display dark:text-white">
          {data.StopEventResponseContext.IsItDeparture ?
            `${data.RequestedStation.StartPoint} ${String.fromCodePoint(10230)} ${data.Destination.EndPointName}` :
            `${data.Origin.PointName} ${String.fromCodePoint(10230)} ${data.RequestedStation.StartPoint}`}
        </div>
        <div className="icon flex flex-col justify-center items-center">
          {/* <div className="type">
            {data.RequestedStation.TransportMethod.PtMode}
          </div> */}
          <TransportIcon type={data.RequestedStation.TransportMethod.PtMode} className="w-12 fill fill-current bg-blue-100 text-blue-600 dark:text-gray-100 dark:bg-blue-600 p-2 rounded-lg" />
          <div className="trainnumber text-red-700 bg-red-100 dark:text-gray-100 dark:bg-red-700 px-3 rounded-full font-bold italic mt-2">
            {data.RequestedStation.PublishedLineName}
          </div>
        </div>
        <div className="info col-span-3 md:col-span-4 flex flex-col">
          <div className="details flex flex-row flex-wrap justify-center content-center sm:text-center py-3 h-full bg-gray-100 dark:bg-gray-600 rounded-xl">
            <div className="time min-w-1/2">
              {data.StopEventResponseContext.IsItDeparture ? "Departure" : "Arrival"} :{" "}
              <span className="font-semibold"> {moment(data.StopEventResponseContext.IsItDeparture ?
                data.RequestedStation.ServiceDeparture.TimetabledTime :
                data.RequestedStation.ServiceArrival.TimetabledTime
              ).format("HH:mm")}</span>
            </div>
            <div className="platform min-w-1/2">
              {/* Some trips include two arrival dynamic platforms, for ex. platform 44/45, so in order to identify those types, I just look if the data includes a "/". If that's the case, I don't have to tell the user that a platform change has occurred */}
              {data.RequestedStation.EstimatedPlatform || data.RequestedStation.PlannedPlatform ? "Platform" :
               data.RequestedStation.TransportMethod.PtMode === "rail" ? "Platform" :  "Duration"} : <span className={`font-semibold ${data.RequestedStation.EstimatedPlatform != undefined && !data.RequestedStation.PlannedPlatform.includes("/") && 'text-red-500'}`}>
                {data.RequestedStation.EstimatedPlatform != undefined && !data.RequestedStation.PlannedPlatform.includes("/") ?
                  data.RequestedStation.EstimatedPlatform + ' | Platform change' :
                  !data.RequestedStation.EstimatedPlatform && !data.RequestedStation.PlannedPlatform && data.RequestedStation.TransportMethod.PtMode === "rail" ?
                   "NA" : data.RequestedStation.EstimatedPlatform || data.RequestedStation.PlannedPlatform || totalTripDuration()}

              </span>
            </div>
            <div className="date min-w-1/2">
              Date : <span className="font-semibold"> {moment(data.RequestedStation.OperatingDay).format("DD-MM-YY")}</span>
            </div>
            <div className="linenumber min-w-1/2">
              Line N° : <span className="font-semibold"> {data.RequestedStation.PublishedLineName} </span>
            </div>
          </div>
        </div>
        {!data.RequestedStation.IsTripCancelled && data.StopEventResponseContext.IsItDeparture && <div className={`status col-span-4 md:col-span-1 flex flex-col justify-center items-center mt-3 md:mt-0 ${deltaBetweenTimetableEstimatedDeparture > 0 ? 'text-red-500' : 'text-green-500'} font-bold text-base`}>
          {deltaBetweenTimetableEstimatedDeparture > 0 ? `+${deltaBetweenTimetableEstimatedDeparture} min` : 'On Time'}
        </div>}
        {!data.RequestedStation.IsTripCancelled && !data.StopEventResponseContext.IsItDeparture && <div className={`status col-span-4 md:col-span-1 flex flex-col justify-center items-center mt-3 md:mt-0${deltaBetweenTimetableEstimatedArrival > 0 ? 'text-red-500' : 'text-green-500'} font-bold text-base`}>
          {deltaBetweenTimetableEstimatedArrival > 0 ? `+${deltaBetweenTimetableEstimatedArrival} min` : 'On Time'}
        </div>}
        {data.RequestedStation.IsTripCancelled && <div className={"status col-span-4 md:col-span-1 flex flex-col justify-center items-center text-red-500 font-bold text-base mt-3 md:mt-0"}>
          {'Cancelled'}
        </div>}
      </div>
      <div
        className={`trainpath hidden ${data.Origin.IsAvailable && data.RequestedStation.StartPointRef != data.Destination.EndPointRef ? "grid-cols-3" : "grid-cols-2"
          } border-t-2 border-gray-200 dark:border-gray-600 py-2 md:grid`}
      >
        {data.Origin.IsAvailable && (
          <div className="origin mx-auto flex flex-col justify-center items-center">
            {data.Origin.PointName}
            <div className="time">
              {moment(data.Origin.ServiceDeparture.TimetabledTime).format(
                "HH:mm"
              )}
            </div>
          </div>
        )}
        <div className="stop mx-auto flex flex-col justify-center items-center">
          {data.RequestedStation.StartPoint}
          <div className="time">
            {moment(data.StopEventResponseContext.IsItDeparture ?
              data.RequestedStation.ServiceDeparture.TimetabledTime :
              data.RequestedStation.ServiceArrival.TimetabledTime
            ).format("HH:mm")}
          </div>
        </div>
        {data.RequestedStation.StartPointRef != data.Destination.EndPointRef &&
          <div className="destination mx-auto flex flex-col justify-center items-center">
            {data.Destination.EndPointName}
            <div className="time">
              {moment(data.Destination.ServiceArrival.TimetabledTime).format(
                "HH:mm"
              )}
            </div>
          </div>}

      </div>
    </div>
  );
};

export default Trip;
