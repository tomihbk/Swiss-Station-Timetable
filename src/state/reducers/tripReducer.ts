import { ActionType } from '../action-types'
import { Action } from '../actions/index'

const initialState = {}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.ADD_TRIPS:
            return [state, action.payload]
        case ActionType.REMOVE_TRIPS:
            return []
        default:
            return state
    }
}

export default reducer