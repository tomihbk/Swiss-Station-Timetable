import { ReactComponent as SearchIcon } from "../images/search.svg";
import { ReactComponent as CalendarIcon } from "../images/calendar.svg";
import { ReactComponent as ClockIcon } from "../images/clock.svg";
import { ReactComponent as DirectionIcon } from "../images/direction.svg";
import { ReactComponent as DocumentIcon } from "../images/document.svg";

import moment from "moment";
import isItFirefox from "../util/isItFirefox";

const SearchForm = (): React.ReactElement => {
    const now = moment().format("hh:mm:ss");
    const formClassStyle =
        "appearance-none bg-white dark:bg-gray-600 px-6 pr-16 rounded-lg text-sm focus:border-solid focus:border-blue-500 dark:focus:border-gray-200 focus:border-2 w-full h-20 transition duration-300";

    return (
        <div className="flex flex-col pt-2 mx-auto my-12 text-gray-800 dark:text-gray-50 filter drop-shadow-md w-8/12 md:w-7/12 lg:w-5/12 min-w-min-suggested-station-card font-secondary">
            <div className="relative mb-6">
                <input
                    className="bg-white dark:bg-gray-600 px-6 pr-16 rounded-lg text-sm focus:border-solid focus:border-blue-500 focus:border-2 dark:focus:border-gray-200 w-full h-20 transition duration-300"
                    type="search"
                    name="search"
                    placeholder="Search for a station..."
                ></input>
                <div className="absolute right-0 top-0 mt-5 mr-5  rounded-full p-2 transition duration-100">
                    <SearchIcon className="fill-current text-gray-500 dark:text-gray-300 w-5" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 w-full">
                <div className="relative flex-grow">
                    <input
                        type="date"
                        defaultValue={moment().format("yyyy-MM-DD")}
                        className={formClassStyle}
                        name="search"
                    ></input>
                    {!isItFirefox() || (
                        <CalendarIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />
                    )}
                </div>

                <div className="relative">
                    <input
                        type="time"
                        defaultValue={now}
                        className={formClassStyle}
                        name="search"
                    ></input>
                    {!isItFirefox() || (
                        <ClockIcon className="absolute right-0 top-0 stroke-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />
                    )}
                </div>

                <div className="relative">
                    <select className={formClassStyle} >
                        <option value="" disabled selected>Departure or Arrival</option>
                        <option value="departure">Departure</option>
                        <option value="arrival">Arrival</option>
                    </select>
                    {!isItFirefox() || (
                        <DirectionIcon className="absolute right-0 top-0 fill-current text-gray-500 dark:text-gray-300 w-5 mt-7 mr-7" />
                    )}
                </div>

                <div className="relative">
                    <select className={formClassStyle}>
                        <option value="" disabled selected>Number of results</option>
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
