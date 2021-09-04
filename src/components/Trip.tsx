import moment from "moment";
import { ReactComponent as TrainSVG } from "../images/train.svg";

const Trip = ({ data }: any): React.ReactElement => {
  return (
    <div className="bg-white dark:bg-gray-700 pt-4 pb-2 mx-auto w-4/6 flex flex-col filter drop-shadow-md rounded-xl text-sm my-5">
      <div className="grid grid-cols-6">
        <div className="icon flex flex-col justify-center items-center">
          <div className="type">
            {data.RequestedStation.TransportMethod.PtMode}
          </div>
          <TrainSVG className="w-12 stroke bg-blue-100 text-blue-700 dark:text-white dark:bg-blue-600 p-2 rounded-lg" />

          <div className="trainnumber text-red-700 bg-red-100 dark:text-gray-100 dark:bg-red-700 px-3 rounded-full font-bold italic my-2">
            {data.RequestedStation.PublishedLineName}
          </div>
        </div>
        <div className="info col-span-4 flex flex-col">
          <div className="destination mx-auto text-2xl font-bold font-display dark:text-white">
            {data.RequestedStation.StartPoint.toUpperCase()} &#10230;{" "}
            {data.Destination.EndPointName.toUpperCase()}
          </div>
          <div className="details flex flex-row flex-wrap text-center py-3 my-3 bg-gray-100 dark:bg-gray-600 rounded-xl">
            <div className="platform min-w-1/2">
              Platform : {data.RequestedStation.PlannedPlatform}
            </div>
            <div className="linenumber min-w-1/2">
              Line N° : {data.RequestedStation.PublishedLineName}
            </div>
            <div className="date min-w-1/2">
              Date : {data.RequestedStation.OperatingDay}
            </div>
            <div className="time min-w-1/2">
              Departure :{" "}
              {moment( data.StopEventResponseContext.IsItDeparture ?
                  data.RequestedStation.ServiceDeparture.TimetabledTime :
                  data.RequestedStation.ServiceArrival.TimetabledTime
              ).format("hh:mm")}
            </div>
          </div>
        </div>
        <div className="status flex flex-col justify-center items-center text-green-500 font-bold">
          On Time
          {data.RequestedStation.ServiceDeparture.hasOwnProperty.call(
            "EstimatedTime"
          ) &&
            moment(data.RequestedStation.ServiceDeparture.TimetabledTime)
              .subtract(
                moment.duration(
                  moment(
                    data.RequestedStation.ServiceDeparture.EstimatedTime
                  ).format()
                )
              )
              .format("mm")}
        </div>
      </div>
      <div
        className={`trainpath grid ${
          data.Origin.IsAvailable ? "grid-cols-3" : "grid-cols-2"
        } border-t-2 border-gray-200 dark:border-gray-600 py-2`}
      >
        {data.Origin.IsAvailable && (
          <div className="origin mx-auto flex flex-col justify-center items-center">
            {data.Origin.PointName}
            <div className="time">
              {moment(data.StopEventResponseContext.IsItDeparture ? data.Origin.ServiceDeparture.TimetabledTime : data.Origin.ServiceArrival.TimetabledTime).format(
                "hh:mm"
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
            ).format("hh:mm")}
          </div>
        </div>
        <div className="destination mx-auto flex flex-col justify-center items-center">
          {data.Destination.EndPointName}
          <div className="time">
            {moment(data.StopEventResponseContext.IsItDeparture ? data.Destination.ServiceArrival.TimetabledTime : data.Destination.ServiceDeparture.TimetabledTime).format(
              "hh:mm"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
