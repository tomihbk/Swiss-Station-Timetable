import { combineReducers } from "redux";
import tripReducer from "./tripReducer";


const reducer = combineReducers({
    trip: tripReducer
})

export default reducer

export type State = ReturnType<typeof reducer>