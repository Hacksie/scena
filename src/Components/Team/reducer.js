import { teamConstants } from './constants';


export function team(state = {}, action) {
    switch (action.type) {
        case teamConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case teamConstants.GETALL_SUCCESS:
            return {
                items: action.team
            };
        case teamConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case teamConstants.ADD_REQUEST:
            return {
                loading: true
            };
        case teamConstants.ADD_SUCCESS:
            return {
                items: action.team
            };
        case teamConstants.ADD_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
}