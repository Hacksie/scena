import { productionsConstants } from '../_constants';

let production = JSON.parse(localStorage.getItem('production'));
const initialState = production ? { loading: false, production } : {};


export function productions(state = initialState, action) {
    switch (action.type) {
        case productionsConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case productionsConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.productions
            };
        case productionsConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };
            case productionsConstants.GET_REQUEST:
                return {
                    ...state
                };
            case productionsConstants.GET_SUCCESS:
                return {
                    ...state,
                    production: action.production
                };
            case productionsConstants.GET_FAILURE:
                return {
                    ...state,
                    error: action.error
                };

        case productionsConstants.ADD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case productionsConstants.ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                production: action.production
            };
        case productionsConstants.ADD_FAILURE:
            return {
                ...state,
                error: action.error
            };
            case productionsConstants.DELETE_REQUEST:
                return {
                    ...state,
                    loading: true
                };
            case productionsConstants.DELETE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    production: {}
                };
            case productionsConstants.DELETE_FAILURE:
                return {
                    ...state,
                    error: action.error
                };
                case productionsConstants.UPDATE_REQUEST:
                    return {
                        ...state,
                        loading: true
                    };
                case productionsConstants.UPDATE_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        production: action.production
                    };
                case productionsConstants.UPDATE_FAILURE:
                    return {
                        ...state,
                        error: action.error
                    };
        default:
            return state
    }
}