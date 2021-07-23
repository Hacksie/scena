import { companyConstants } from '../_constants';
import { companyService } from '../_services';
import { alertActions } from '.';

import { history } from '../_helpers';

export const companyActions = {
    register,
    getById
};



function register(company) {
    return dispatch => {
        dispatch(request(company));

        companyService.register(company)
            .then(
                company => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Company registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(company) { return { type: companyConstants.REGISTER_REQUEST, company } }
    function success(company) { return { type: companyConstants.REGISTER_SUCCESS, company } }
    function failure(error) { return { type: companyConstants.REGISTER_FAILURE, error } }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function getById(id) {

    return dispatch => {
        dispatch(request(id));

        companyService.getById(id)
            .then(
                company => dispatch(success(company)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: companyConstants.GET_REQUEST } }
    function success(company) { return { type: companyConstants.GET_SUCCESS, company } }
    function failure(id, error) { return { type: companyConstants.GET_FAILURE, id, error } }
}