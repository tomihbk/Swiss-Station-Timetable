import { ActionType } from '../action-types'
import { Action } from '../actions/index'

const initialState = {}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.ADD_API_REQUEST:
            return { ...state, data: action.payload }
        default:
            return state
    }
}

export default reducer