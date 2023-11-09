import { useEffect, useState } from "react";
import moment from "moment";
import { AxiosResponse } from "axios";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { ReactComponent as CalendarIcon } from "../images/calendar.svg";
import { ReactComponent as ClockIcon } from "../images/clock.svg";
import { ReactComponent as DirectionIcon } from "../images/direction.svg";
import { ReactComponent as DocumentIcon } from "../images/document.svg";
import { ReactComponent as ScrollDownIcon } from "../images/scrolldown.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ApiBodyTypeData } from '../state/action-types/index'
import apiCaller from "../util/apiCaller";
import { addTrips } from "../state/features/trip/tripSlice";
import { addAPIQuery } from "../state/features/api/apiSlice";

export const getAllStations = async () => {
  try {
    return await fetch(process.env.REACT_APP_STATIONS_LIST_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    })
      .then(res => Promise.all([res.json()]))
      .then(([jsonData]) => jsonData)
  } catch (err) {
    //console.log(err)
  }
}

const SearchForm = (): React.ReactElement => {

  interface FilteredDataType {
    id: number;
    name: string;
  }
  
  interface StationListDataType extends FilteredDataType {
    longname?: string;
  }

  const [stationsList, setStationsList] = useState<StationListDataType[]>();

  useEffect(() => {
    search();
    const fetchStations = async () =>{
      setStationsList(await getAllStations())
    }
    fetchStations()
  }, []);

  const history = useHistory();
  const now = moment().format("HH:mm:ss");
 
  const [filteredStationData, setFilteredStationData] = useState<FilteredDataType[]>();
  const [apiBodyData, setApiBodyData] = useState<ApiBodyTypeData>();
  const [numberOfResults, setNumberOfResults] = useState<string>();
  const [searchedStation, setSearchedStation] = useState<string>();
  const [arrivalOrDeparture, setArrivalOrDeparture] = useState<string>();
  const [arrivalOrDepartureTime, setArrivalOrDepartureTime] = useState<string>();
  const [stopPlaceReference, setStopPlaceReference] = useState<string>();
  const [currentTimeStamp, setCurrentTimeStamp] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<string>(now);
  const [selectedDate, setSelectedDate] = useState<string>(moment().format("yyyy-MM-DD"));

  const dispatch = useDispatch();

  const formClassStyle =
    "appearance-none bg-white dark:bg-gray-600 px-6 pr-16 rounded-lg text-sm focus:border-solid focus:border-blue-500 dark:focus:border-gray-200 focus:border-2 w-full h-20 transition duration-300 hover:cursor-pointer";

  const lowerCaseAndNoDiacritic = (word: (string | undefined)): string => {
    return word != undefined ? word
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^\w\s]/gi, "") //this removes special characters
      .replace(/[\u0300-\u036f]/g, "") : ""; //this removes diacritics
  };
  const filterHandler = (data: React.FormEvent<HTMLInputElement>) => {
    const searchedLocation = data.currentTarget.value;
    setSearchedStation(searchedLocation);
    // Starts the search process after two letters have been entered
    if (searchedLocation.length > 2) {
      // This makes sure that the results start with the first input letter
      // For ex. Bern -> all results must start by the letter B, we don't need results that contain the letter B in the middle
      const filterStationFirstLetter = Object.values(stationsList).filter((station) =>
        lowerCaseAndNoDiacritic(station.name).startsWith(
          lowerCaseAndNoDiacritic(searchedLocation[0])
        ) || lowerCaseAndNoDiacritic(station.longname).startsWith(
          lowerCaseAndNoDiacritic(searchedLocation[0])
        )
      );

      // Filtered results from the function above
      const filteredStations = filterStationFirstLetter.filter((station) =>
        lowerCaseAndNoDiacritic(station.name).includes(
          lowerCaseAndNoDiacritic(data.currentTarget.value)
        ) ||
        lowerCaseAndNoDiacritic(station.longname).includes(
          lowerCaseAndNoDiacritic(data.currentTarget.value)
        )
      );
      // If I want to filter the search result by station id
      // filteredStations.sort((a, b)=>{ 
      //   return a.id - b.id
      // })
      setFilteredStationData(filteredStations);
    } else {
      setFilteredStationData([]);
    }
  };

  const randomStationName = (): string => {
    // Generate random index based on number of keys
    const randIndex = Math.floor(
      Math.random() * stationsList?.length
    );
    // Select a key from the array of keys using the random index
    return stationsList ? stationsList[randIndex]?.name : "";
  };

  const selectStation = (data: FilteredDataType) => {
    setSearchedStation(data.name);
    setStopPlaceReference(data.id.toString());
    setFilteredStationData([]);
  };

  useEffect(() => {
    try {
      if (apiBodyData) {
        apiCaller(apiBodyData, (res: AxiosResponse) => {
          dispatch(addTrips(res.data))
          dispatch(addAPIQuery(apiBodyData))
          history.push("/trips");
        }, (err: AxiosResponse) => {
          console.log(err);
        })
      }
    } catch (err) {
      console.log(err)
    }
  }, [apiBodyData]);

  useEffect(() => {
    setArrivalOrDepartureTime(moment(`${selectedDate} ${selectedTime}`).format("YYYY-MM-DDTHH:mm:ss"));
  }, [selectedDate, selectedTime])

  const search = async (
    e: React.FormEvent<HTMLFormElement> | undefined = undefined
  ) => {
    e?.preventDefault();

    setArrivalOrDeparture(arrivalOrDeparture || undefined);
    setNumberOfResults(numberOfResults || undefined);
    setCurrentTimeStamp(moment.utc().format());

    if (
      numberOfResults &&
      arrivalOrDeparture &&
      arrivalOrDepartureTime &&
      stopPlaceReference
    ) {
      setApiBodyData({
        RequestorReference: "Swiss Station Timetable",
        RequestCurrentTimeStamp: currentTimeStamp,
        StopPlaceReference: stopPlaceReference,
        NumberOfResult: numberOfResults,
        ArrivalOrDepature: arrivalOrDeparture,
        ArrivalOrDepatureTime: arrivalOrDepartureTime,
        EnableRealTimeData: "true",
        IncludePreviousCalls: "true",
        IncludeOnwardCalls: "true",
      });

    }
  };

  return (
    <form onSubmit={search}>
      <div className="flex flex-col flex-wrap pt-2 mx-auto my-12 text-gray-800 dark:text-gray-50 filter drop-shadow-md w-8/12 md:w-9/12 lg:w-10/12 min-w-min-suggested-station-card font-secondary">
        <div className="relative mb-6 mx-auto w-full lg:w-6/12">
          <input
            className="bg-white dark:bg-gray-600 px-6 pr-16 rounded-lg text-md border-solid focus:border-blue-500 focus:border-2 dark:focus:border-gray-200 w-full h-20 transition duration-300"
            type="search"
            name="search"
            aria-label="station name"
            required
            value={searchedStation || ""}
            placeholder={`Search for a station for ex. : ${randomStationName()}`}
            onChange={filterHandler}
            autoComplete="off"
          ></input>
          <div className="absolute right-0 top-0 mt-5 mr-5  rounded-full p-2 transition duration-100">
            <SearchIcon className="fill-currenttext-gray-500 dark:text-gray-300 w-5" />
          </div>
        </div>
        <div className="relative mx-auto w-full lg:w-9/12">
          {filteredStationData && filteredStationData?.length > 10 && (
            <p className="flex flex-row flex-wrap justify-center gap-4 text-sm text-gray-400 mb-3 -mt-3">
              <ScrollDownIcon className="animate-bounce w-4" />
              Scroll down for more result
              <ScrollDownIcon className="animate-bounce w-4" />
            </p>
          )}
          <div
            role="search results"
            className={`absolute top-0 z-20 grid grid-cols-1 w-full md:grid-cols-2 bg-white dark:bg-gray-600 rounded-xl justify-center text-center mb-6 overflow-auto transition duration-300 ease-in-out hide-scrollbar mx-auto justify-items-center items-center ${filteredStationData && filteredStationData?.length === 1
              ? "relative lg:grid-cols-1 lg:w-8/12"
              : filteredStationData?.length === 2
                ? "relative lg:grid-cols-2 lg:w-8/12"
                : filteredStationData?.length === 3
                  ? "relative lg:grid-cols-3 lg:w-8/12"
                  : filteredStationData?.length === 4
                    ? "relative lg:grid-cols-4"
                    : "lg:grid-cols-4"
              } ${filteredStationData && filteredStationData?.length > 10 && "h-96 mt-4"}`}
          >
            {filteredStationData?.length != 0 &&
              filteredStationData?.map((station: FilteredDataType, key) => {
                return (
                  <div
                    id={`${station.id}`}
                    key={key}
                    className="hover:cursor-pointer hover:bg-blue-100 hover:text-blue-700 dark:text-gray-50 dark:hover:bg-gray-500 transition duration-150 p-4 rounded-lg mx-auto w-full"
                    onClick={() => selectStation(station)}
                  >
                    {station.name}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 w-full mx-auto lg:w-6/12">
          <div className="relative flex-grow">
            <input
              type="date"
              aria-label="date"
              defaultValue={moment().format("yyyy-MM-DD")}
              className={formClassStyle}
              onChange={(e) => setSelectedDate(e.currentTarget.value)}
            ></input>
            {<CalendarIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />}
          </div>

          <div className="relative">
            <input
              step="any"
              type="time"
              defaultValue={now}
              className={formClassStyle}
              aria-label="time"
              onChange={(e) => setSelectedTime(e.currentTarget.value)}
            ></input>
            {<ClockIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />}
          </div>

          <div className="relative">
            <select
              required
              className={formClassStyle}
              defaultValue=""
              aria-label="direction"
              name="ArrivalOrDepature"
              value={apiBodyData?.ArrivalOrDepature}
              onChange={(e) => setArrivalOrDeparture(e.currentTarget.value)}
            >
              <option value="" disabled hidden>
                Departure or Arrival
              </option>
              <option value="departure">Departure</option>
              <option value="arrival">Arrival</option>
            </select>
            {<DirectionIcon className="absolute right-0 top-0 fill-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />}
          </div>

          <div className="relative">
            <select
              required
              className={formClassStyle}
              defaultValue=""
              aria-label="result quantity"
              name="NumberOfResult"
              value={apiBodyData?.NumberOfResult}
              onChange={(e) => setNumberOfResults(e.currentTarget.value)}
            >
              <option value="" disabled hidden>
                Number of results
              </option>
              <option value="5">5 results</option>
              <option value="10">10 results</option>
              <option value="20">20 results</option>
              <option value="30">30 results</option>
              <option value="50">50 results</option>
            </select>
            {<DocumentIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />}
          </div>
          <div className="relative md:col-span-2 mt-2">
            <input
              type="submit"
              className="appearance-none bg-green-600 dark:bg-green-700 px-6 rounded-lg text-md text-gray-100 font-bold hover:border-2 dark:hover:border-gray-200 dark:hover:border-2 hover:bg-green-500 hover:cursor-pointer w-full h-12 transition duration-300"
              value="Search"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;