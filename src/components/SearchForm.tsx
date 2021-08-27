import { ReactComponent as SearchIcon } from "../images/search.svg";
import { ReactComponent as CalendarIcon } from "../images/calendar.svg";
import { ReactComponent as ClockIcon } from "../images/clock.svg";
import { ReactComponent as DirectionIcon } from "../images/direction.svg";
import { ReactComponent as DocumentIcon } from "../images/document.svg";
import { ReactComponent as ScrollDownIcon } from "../images/scrolldown.svg";

import { useState } from 'react'
import moment from "moment";
import isItFirefox from "../util/isItFirefox";
import stationsList from '../data/stationlist'


const SearchForm = (): React.ReactElement => {
    interface FilteredDataType {
        id: number;
        name: string;
    }[]

    const [filteredData, setFilteredData] = useState<FilteredDataType[]>()

    const now = moment().format("hh:mm:ss");

    const formClassStyle =
        "appearance-none bg-white dark:bg-gray-600 px-6 pr-16 rounded-lg text-sm focus:border-solid focus:border-blue-500 dark:focus:border-gray-200 focus:border-2 w-full h-20 transition duration-300";

    const lowerCaseAndNoDiacritic = (word: string): string => {
        return word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    }
    const filterHandler = (data: React.FormEvent<HTMLInputElement>) => {
        const searchedLocation = data.currentTarget.value

        // Starts the search process after two letters have been entered
        if (searchedLocation.length > 2) {
            // This makes sure that the results start with the first input letter
            // For ex. Bern -> all results must start by the letter B, we don't need results that contain the letter B in the middle
            const filterStationFirstLetter = stationsList.filter(station => lowerCaseAndNoDiacritic(station.name).startsWith(lowerCaseAndNoDiacritic(searchedLocation[0])))

            // Filtered results from the function above
            const newFilterer = filterStationFirstLetter.filter(station => lowerCaseAndNoDiacritic(station.name).includes(lowerCaseAndNoDiacritic(data.currentTarget.value)))

            setFilteredData(newFilterer)
        } else {
            setFilteredData([])
        }
    }

    const randomStationName = (): string => {
        // Generate random index based on number of keys
        const randIndex = Math.floor(Math.random() * Object.keys(stationsList).length)

        // Select a key from the array of keys using the random index
        return Object.values(stationsList)[randIndex].name
    }

    return (
        <div className="flex flex-col pt-2 mx-auto my-12 text-gray-800 dark:text-gray-50 filter drop-shadow-md w-8/12 md:w-7/12 lg:w-10/12 min-w-min-suggested-station-card font-secondary">
            <h1>{filteredData && filteredData?.length}</h1>
            <div className="relative mb-6 mx-auto w-full lg:w-6/12">
                <input
                    className="bg-white dark:bg-gray-600 px-6 pr-16 rounded-lg text-sm focus:border-solid focus:border-blue-500 focus:border-2 dark:focus:border-gray-200 w-full h-20 transition duration-300"
                    type="search"
                    name="search"
                    placeholder={`Search for a station : ${randomStationName()}`}
                    onChange={filterHandler}></input>
                <div className="absolute right-0 top-0 mt-5 mr-5  rounded-full p-2 transition duration-100">
                    <SearchIcon className="fill-current text-gray-500 dark:text-gray-300 w-5" />
                </div>
            </div>
            <div className="relative mx-auto w-full lg:w-9/12">
                <div className={`absolute top-0 z-20 grid grid-cols-1 w-full md:grid-cols-2 bg-white dark:bg-gray-600 rounded-xl justify-center text-center mb-6 overflow-auto transition duration-300 ease-in-out hide-scrollbar mx-auto justify-items-center items-center ${filteredData && filteredData?.length === 1 ? 'relative lg:grid-cols-1 lg:w-8/12' : filteredData?.length === 2 ? 'relative lg:grid-cols-2 lg:w-8/12' : filteredData?.length === 3 ? 'relative lg:grid-cols-3 lg:w-8/12' : filteredData?.length === 4 ? 'relative lg:grid-cols-4' : 'lg:grid-cols-4'} ${filteredData && filteredData?.length > 10 ? 'h-96' : ''}`}>
                    {filteredData?.length != 0 && filteredData?.map((station: FilteredDataType, key) => {
                        return (
                            <div key={key} className="hover:cursor-pointer dark:hover:bg-gray-500 p-4 rounded-lg mx-auto w-full" onClick={() => alert(`${station.name} : ${station.id}`)}>{station.name}</div>)
                    })}
                    {filteredData && filteredData?.length > 10 ? <ScrollDownIcon className="animate-bounce sticky bottom-0 right-2/4 left-2/4 w-8 mb-4" /> : ''}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 w-full mx-auto lg:w-6/12">

                <div className="relative flex-grow">
                    <input
                        type="date"
                        defaultValue={moment().format("yyyy-MM-DD")}
                        className={formClassStyle}
                        name="search"
                    ></input>
                    {!isItFirefox() || (
                        <CalendarIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />)}
                </div>

                <div className="relative">
                    <input
                        type="time"
                        defaultValue={now}
                        className={formClassStyle}
                        name="search"
                    ></input>
                    {!isItFirefox() || (
                        <ClockIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />)}
                </div>

                <div className="relative">
                    <select className={formClassStyle} >
                        <option value="" disabled selected hidden>Departure or Arrival</option>
                        <option value="departure">Departure</option>
                        <option value="arrival">Arrival</option>
                    </select>
                    {!isItFirefox() || (
                        <DirectionIcon className="absolute right-0 top-0 fill-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />
                    )}
                </div>

                <div className="relative">
                    <select className={formClassStyle}>
                        <option value="" disabled selected hidden>Number of results</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                    </select>
                    {!isItFirefox() || (
                        <DocumentIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
