import { ActionType, ApiBodyTypeData } from '../action-types/index'

interface AddTripsAction {
    type: ActionType.ADD_TRIPS,
    payload: Array<string>
}

interface AddApiRequestAction {
    type: ActionType.ADD_API_REQUEST,
    payload: ApiBodyTypeData
}


interface RemoveTripsAction {
    type: ActionType.REMOVE_TRIPS,
}

export type Action = AddTripsAction | RemoveTripsAction | AddApiRequestAction
