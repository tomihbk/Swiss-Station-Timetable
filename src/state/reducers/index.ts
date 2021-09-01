import { combineReducers } from "redux";
import tripReducer from "./tripReducer";


const reducer = combineReducers({
    trip: tripReducer
})

export default reducer