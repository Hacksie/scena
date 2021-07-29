import { companyConstants } from './constants';

export function company(state = {}, action) {
    switch (action.type) {
        case companyConstants.REGISTER_REQUEST:
            return { registering: true };
        case companyConstants.REGISTER_SUCCESS:
            return {};
        case companyConstants.REGISTER_FAILURE:
            return {};

        case companyConstants.GET_REQUEST:
            return {
                loading: true
            };
        case companyConstants.GET_SUCCESS:
            return {
                id: action.company.id,
                displayName: action.company.displayName,
                logo: action.company.logo
            };
        case companyConstants.GET_FAILURE:
            return {
                error: action.error
            };

        // case userConstants.DELETE_REQUEST:
        //     // add 'deleting:true' property to user being deleted
        //     return {
        //         ...state,
        //         items: state.items.map(user =>
        //             user.id === action.id
        //                 ? { ...user, deleting: true }
        //                 : user
        //         )
        //     };
        // case userConstants.DELETE_SUCCESS:
        //     // remove deleted user from state
        //     return {
        //         items: state.items.filter(user => user.id !== action.id)
        //     };
        // case userConstants.DELETE_FAILURE:
        //     // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        //     return {
        //         ...state,
        //         items: state.items.map(user => {
        //             if (user.id === action.id) {
        //                 // make copy of user without 'deleting:true' property
        //                 const { deleting, ...userCopy } = user;
        //                 // return copy of user with 'deleteError:[error]' property
        //                 return { ...userCopy, deleteError: action.error };
        //             }

        //             return user;
        //         })
        //     };
        default:
            return state
    }
}