import SearchForm from "../components/SearchForm"
import SuggestedStationsList from "../components/SuggestedStationsList"
import ToggleTheme from "../components/ToggleTheme"

const Home = (): React.ReactElement => {

    return (
        <div>
            <ToggleTheme/>
            <h1 className="text-red-700 dark:text-red-600 font-display font-black text-6xl text-center mt-8">Swiss Station Timetable</h1>
            <p className="text-gray-600 text-lg text-center mt-4 font-secondary dark:text-gray-300 mx-2">Click on the suggested stations or use the search bar</p>
            <div className="mt-15 relative z-20">
            <SearchForm/>
            </div>
            <div className="mt-10 relative z-10">
            <SuggestedStationsList/> 
            </div>
            
        </div>
    )
}

export default Home
