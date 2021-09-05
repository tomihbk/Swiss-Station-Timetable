import { combineReducers } from "redux";
import tripReducer from "./tripReducer";
import apiReducer from "./apiReducer";


const reducer = combineReducers({
    trip: tripReducer,
    api: apiReducer
})

export default reducer

export type ReducerStateType = ReturnType<typeof reducer>