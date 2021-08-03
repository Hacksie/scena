import { teamConstants } from './constants';
//import { teamService } from '../../_services';
//import { alertActions } from '../Alerts';
// import { history } from '../_helpers';

export const teamActions = {
    add,
    getAll
};

function add(member) {
    return dispatch => {
        dispatch(request(member));

        // teamService.add(member)
        //     .then(
        //         team => { 
        //             dispatch(success(team));
        //             //history.push('/team');
        //             //dispatch(alertActions.success('Team member added successful'));
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };

    function request(member) { return { type: teamConstants.ADD_REQUEST, member } }
    function success(team) { return { type: teamConstants.ADD_SUCCESS, team } }
    function failure(error) { return { type: teamConstants.ADD_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        // teamService.getAll()
        //     .then(
        //         team => dispatch(success(team)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: teamConstants.GETALL_REQUEST } }
    function success(team) { return { type: teamConstants.GETALL_SUCCESS, team } }
    function failure(error) { return { type: teamConstants.GETALL_FAILURE, error } }
}
