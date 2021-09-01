import { ActionType } from '../action-types/index'

interface AddTripsAction {
    type: ActionType.ADD_TRIPS,
    payload: string
}

interface RemoveTripsAction {
    type: ActionType.REMOVE_TRIPS,
    payload: string
}

export type Action = AddTripsAction | RemoveTripsAction
