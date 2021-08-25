import ModernSearchBar from "../components/ModernSearchBar"
import SuggestedStationsList from "../components/SuggestedStationsList"
import ToggleTheme from "../components/ToggleTheme"

const Home = (): React.ReactElement => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-800 transition duration-500" >
            <ToggleTheme/>
            <h1 className="text-red-700 font-display font-black text-6xl text-center mt-10">Swiss Station Timetable</h1>
            <p className="text-gray-600 text-lg text-center mt-4 font-secondary dark:text-gray-300 mx-2">Click on the suggested stations or use the search bar</p>
            <div className="mt-10">
            <SuggestedStationsList /> 
            </div>
            <div className="mt-15">
               <ModernSearchBar/>
            </div>
        </div>
    )
}

export default Home
