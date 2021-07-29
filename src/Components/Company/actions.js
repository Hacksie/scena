import firebase from 'firebase/app';

import { companyConstants } from './constants';
import { alertActions } from '../Alerts';

import { userActions } from '../User/actions';

// import { useFirestore } from 'react-redux-firebase'
// import { getFirestore } from 'redux-firestore';

export const companyActions = {
    register,
    getById
};


function register(company) {

    return dispatch => {
        dispatch(request(company));

        const newCompany = {
            ...company,
            createdBy: firebase.auth().currentUser.uid,
            users:firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        }

        firebase.firestore().collection('companies').add(newCompany)
            .then(
                company => { 
                    dispatch(success(company));
                    dispatch(alertActions.success('Company registration successful'));
                    console.log(company);
                    dispatch(userActions.selectCompany(company.id));
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
/*
        companyService.getById(id)
            .then(
                company => dispatch(success(company)),
                error => dispatch(failure(id, error.toString()))
            );*/
    };

    function request(id) { return { type: companyConstants.GET_REQUEST } }
    function success(company) { return { type: companyConstants.GET_SUCCESS, company } }
    function failure(id, error) { return { type: companyConstants.GET_FAILURE, id, error } }
}