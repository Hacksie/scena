import firebase from 'firebase/app';

import { companyConstants } from './constants';
import { alertActions } from '../Alerts';

import { userActions } from '../User/actions';

// import { useFirestore } from 'react-redux-firebase'
// import { getFirestore } from 'redux-firestore';

export const companyActions = {
    register,
    update,
};


function register(company) {

    return dispatch => {
        dispatch(request(company));

        const newCompany = {
            ...company,
            owner: firebase.auth().currentUser.uid,
            created: new Date(),
            users:firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        }

        firebase.firestore().collection('companies').add(newCompany)
            .then(
                company => { 
                    dispatch(success(company));
                    dispatch(alertActions.success('Company registration successful'));
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

function update(companyId, company) {

    return dispatch => {
        dispatch(request(company));

        firebase.firestore().collection('companies').doc(companyId).update(company)
            .then(
                company => { 
                    dispatch(success(company));
                    dispatch(alertActions.success('Company update successful'));
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
