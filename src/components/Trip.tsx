import moment from "moment";
import { ReactComponent as TrainSVG } from "../images/train.svg";

const Trip = ({ data }: any): React.ReactElement => {

  let isEstimatedAvailable = false
  let deltaBetweenTimetableEstimated = 0

  if (Object.prototype.hasOwnProperty.call(data.RequestedStation.ServiceDeparture, "EstimatedTime")) {

    isEstimatedAvailable = true

    const timetable = moment(data.RequestedStation.ServiceDeparture.TimetabledTime);
    const estimated = moment(data.RequestedStation.ServiceDeparture.EstimatedTime);

    deltaBetweenTimetableEstimated = estimated.diff(timetable, 'minutes')
  }

  return (
    <div className="bg-white pr-4 md:pr-0 dark:bg-gray-700 pt-4 pb-2 mx-auto w-5/6 md:w-4/6 flex flex-col filter drop-shadow-md rounded-xl text-sm my-5">
      <div className="grid grid-cols-4 md:grid-cols-6">
        <div className="icon flex flex-col justify-center items-center">
          <div className="type">
            {data.RequestedStation.TransportMethod.PtMode}
          </div>
          <TrainSVG className="w-12 stroke bg-blue-100 text-blue-700 dark:text-white dark:bg-blue-600 p-2 rounded-lg" />

          <div className="trainnumber text-red-700 bg-red-100 dark:text-gray-100 dark:bg-red-700 px-3 rounded-full font-bold italic my-2">
            {data.RequestedStation.PublishedLineName}
          </div>
        </div>
        <div className="info col-span-3 md:col-span-4 flex flex-col">
          <div className="destination mx-auto text-2xl font-bold font-display dark:text-white">
            {data.RequestedStation.StartPoint} &#10230;{" "}
            {data.Destination.EndPointName}
          </div>
          <div className="details flex flex-row flex-wrap text-center py-3 my-3 bg-gray-100 dark:bg-gray-600 rounded-xl">
            <div className="platform min-w-1/2">
              Platform : <span className="font-semibold"> {data.RequestedStation.PlannedPlatform} </span>
            </div>
            <div className="linenumber min-w-1/2">
              Line N° : <span className="font-semibold"> {data.RequestedStation.PublishedLineName} </span>
            </div>
            <div className="date min-w-1/2">
              Date : <span className="font-semibold"> {moment(data.RequestedStation.OperatingDay).format("DD-MM-YY")}</span>
            </div>
            <div className="time min-w-1/2">
              {data.StopEventResponseContext.isItDeparture ? "Departure" : "Arrival"} :{" "}
              <span className="font-semibold"> {moment(data.StopEventResponseContext.IsItDeparture ?
                data.RequestedStation.ServiceDeparture.TimetabledTime :
                data.RequestedStation.ServiceArrival.TimetabledTime
              ).format("HH:mm")}</span>
            </div>
          </div>
        </div>
        <div className={`status col-span-4 md:col-span-1 flex flex-col justify-center items-center ${deltaBetweenTimetableEstimated > 0 ? 'text-red-500' : 'text-green-500'} font-bold text-base`}>
          {deltaBetweenTimetableEstimated > 0 ? `+${deltaBetweenTimetableEstimated} min` : 'On Time'}
        </div>
      </div>
      <div
        className={`trainpath hidden ${data.Origin.IsAvailable ? "grid-cols-3" : "grid-cols-2"
          } border-t-2 border-gray-200 dark:border-gray-600 py-2 md:grid`}
      >
        {data.Origin.IsAvailable && (
          <div className="origin mx-auto flex flex-col justify-center items-center">
            {data.Origin.PointName}
            <div className="time">
              {moment(data.StopEventResponseContext.IsItDeparture ? data.Origin.ServiceDeparture.TimetabledTime : data.Origin.ServiceArrival.TimetabledTime).format(
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
        <div className="destination mx-auto flex flex-col justify-center items-center">
          {data.Destination.EndPointName}
          <div className="time">
            {moment(data.StopEventResponseContext.IsItDeparture ? data.Destination.ServiceArrival.TimetabledTime : data.Destination.ServiceDeparture.TimetabledTime).format(
              "HH:mm"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
