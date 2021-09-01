import { ActionType } from "../action-types"
import { Dispatch } from "redux"
import { Action } from "../actions"


export const addTrips = (trips: Array<string>) => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.ADD_TRIPS,
            payload: trips
        })
    }
}

export const removeTrips = () => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.REMOVE_TRIPS
        })
    }
}