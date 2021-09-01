import { ActionType } from '../action-types/index'

interface AddTripsAction {
    type: ActionType.ADD_TRIPS,
    payload: Array<string>
}

interface RemoveTripsAction {
    type: ActionType.REMOVE_TRIPS,
}

export type Action = AddTripsAction | RemoveTripsAction
