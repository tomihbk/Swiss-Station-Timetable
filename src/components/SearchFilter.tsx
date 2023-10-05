import { useState } from "react";
import moment from "moment";
import { AxiosResponse } from "axios";

import { ReactComponent as ClockIcon } from "../images/clock.svg";
import { ReactComponent as DirectionIcon } from "../images/direction.svg";
import { ReactComponent as DocumentIcon } from "../images/document.svg";
import { ReactComponent as RefreshIcon } from "../images/refresh.svg";

import { store } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { ApiBodyTypeData } from '../state/action-types/index'
import { addTrips } from "../state/features/trip/tripSlice";

import apiCaller from "../util/apiCaller";
import isItFirefox from "../util/isItFirefox";
import { updateAPIQuery } from "../state/features/api/apiSlice";

const SearchFilter = (): React.ReactElement => {
    const {apiQuery} =  useSelector((store: any) => store.apiquery);
    const apiRequestData: ApiBodyTypeData = apiQuery

    const [numberOfResults, setNumberOfResults] = useState<string>(apiRequestData.NumberOfResult);
    const [arrivalOrDeparture, setArrivalOrDeparture] = useState<string>(apiRequestData.ArrivalOrDepature);
    const [selectedTime, setSelectedTime] = useState<string>(moment(apiRequestData.ArrivalOrDepatureTime).format("HH:mm:ss"));
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch();

    const formClassStyle =
        "appearance-none bg-white dark:bg-gray-600 px-6 pr-16 rounded-lg text-sm focus:border-solid focus:border-blue-500 dark:focus:border-gray-200 focus:border-2 w-full h-14 transition duration-300 hover:cursor-pointer";

    const refreshResult = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        const hour: number = moment(selectedTime, "HH:mm:ss").hour()
        const minute: number = moment(selectedTime, "HH:mm:ss").minute()
        const second: number = moment(selectedTime, "HH:mm:ss").second()
        const dateTime = moment(apiRequestData.ArrivalOrDepatureTime, "YYYY-MM-DDTHH:mm:ss");
        dateTime.set({ h: hour, m: minute, s: second });

        dispatch(updateAPIQuery({
            NumberOfResult : numberOfResults,
            ArrivalOrDepature: arrivalOrDeparture,
            ArrivalOrDepatureTime: dateTime.format("YYYY-MM-DDTHH:mm:ss")
        }))

        setLoading(true)
        const updatedAPIQueryState:ApiBodyTypeData = store.getState().apiquery.apiQuery;

        await apiCaller(updatedAPIQueryState, (res: AxiosResponse) => {
            dispatch(addTrips(res.data))
        }, (err: AxiosResponse) => {
            console.log(err);
        }).then(()=> setLoading(false))

            
    }
    return (
        <form onSubmit={refreshResult} className="lg:sticky lg:top-0" style={{ zIndex: 500 }}>
            <div className="pt-2 mx-auto my-6 text-gray-800 dark:text-gray-50 filter drop-shadow-md w-8/12 md:w-9/12 lg:w-10/12 font-secondary">
                <div className="flex flex-row flex-wrap justify-center gap-3 relative mb-6 mx-auto w-full lg:w-8/12">

                    <div className="relative" style={{ minWidth: "250px" }}>
                        <input
                            type="time"
                            step="any"
                            defaultValue={selectedTime}
                            className={formClassStyle}
                            name="time"
                            onChange={(e) => setSelectedTime(e.currentTarget.value)}
                        ></input>
                        {!isItFirefox() || (
                            <ClockIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-4 mr-7" />
                        )}
                    </div>

                    <div className="relative" style={{ minWidth: "250px" }}>
                        <select
                            required
                            className={formClassStyle}
                            defaultValue={arrivalOrDeparture}
                            name="ArrivalOrDepature"
                            onChange={(e) => setArrivalOrDeparture(e.currentTarget.value)}
                        >
                            <option value="" disabled hidden>
                                Departure or Arrival
                            </option>
                            <option value="departure">Departure</option>
                            <option value="arrival">Arrival</option>
                        </select>
                        {!isItFirefox() || (
                            <DirectionIcon className="absolute right-0 top-0 fill-current text-gray-500 dark:text-gray-300 w-5 mt-4 mr-7" />
                        )}
                    </div>

                    <div className="relative" style={{ minWidth: "250px" }}>
                        <select
                            required
                            className={formClassStyle}
                            defaultValue={numberOfResults}
                            name="NumberOfResult"
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
                        {!isItFirefox() || (
                            <DocumentIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-4 mr-7" />
                        )}
                    </div>
                    <div className="relative flex items-center justify-center">
                        <button
                            type="submit"
                            className="appearance-none bg-green-600 dark:bg-green-700 p-3 rounded-full text-md text-gray-100 font-bold hover:bg-green-500 dark:hover:bg-green-500 hover:cursor-pointer transition duration-300"
                            value="Refresh"
                        > <RefreshIcon className={`w-7 ${loading && 'animate-spin'}`} /></button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SearchFilter;
