import firebase from 'firebase/app';
import { productionsConstants } from './constants';
//import { productionsService } from '../../_services';

import { alertActions } from '../Alerts';
import { userActions } from '../User';
import { history } from '../History';
// import { history } from '../_helpers';

export const productionsActions = {
    getAll,
    getById,
    add,
    delete:_delete,
    update
};

function add(production, companyId) {
    return dispatch => {
        dispatch(request(production));

        const newProduction = {
            ...production,
            owner: firebase.auth().currentUser.uid,
            created: new Date(),
            users:firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid),
            companyId: companyId
        }

        firebase.firestore().collection('productions').add(newProduction)
            .then(
                production => { 
                    dispatch(success(production));
                    dispatch(userActions.selectProduction(production.id));
                    dispatch(alertActions.success('Production added successfully'));
                    history.push('/production');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(production) { return { type: productionsConstants.ADD_REQUEST, production } }
    function success(production) { return { type: productionsConstants.ADD_SUCCESS, production } }
    function failure(error) { return { type: productionsConstants.ADD_FAILURE, error } }
}

function update(productionId, updatedProduction) {
    return dispatch => {
        dispatch(request(updatedProduction));

        firebase.firestore().collection('productions').doc(productionId).update(updatedProduction)
            .then(
                production => { 
                    dispatch(success(production));
                    //history.push('/team');
                    dispatch(alertActions.success('Production updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(production) { return { type: productionsConstants.UPDATE_REQUEST, production } }
    function success(production) { return { type: productionsConstants.UPDATE_SUCCESS, production } }
    function failure(error) { return { type: productionsConstants.UPDATE_FAILURE, error } }
}

function _delete(productionId, selectedProductionId) {

    return dispatch => {
        dispatch(request(productionId));
        firebase.firestore().collection('productions').doc(productionId).delete()
            .then(
                production => { 
                    dispatch(success(production));
                    //history.push('/team');
                    dispatch(alertActions.success('Production deleted successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

        /*
        productionsService.delete(productionId)
            .then(
                productionId => { 
                    //console.log(production);
                    dispatch(success(productionId));
                    dispatch(getAll());
                    //history.push('/team');
                    dispatch(alertActions.success('Production deleted successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );*/
    };

    function request(productionId) { return { type: productionsConstants.DELETE_REQUEST, productionId } }
    function success(productionId) { return { type: productionsConstants.DELETE_SUCCESS } }
    function failure(error) { return { type: productionsConstants.DELETE_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());
/*
        productionsService.getAll()
            .then(
                productions => dispatch(success(productions)),
                error => dispatch(failure(error.toString()))
            );*/
    };

    function request() { return { type: productionsConstants.GETALL_REQUEST } }
    function success(productions) { return { type: productionsConstants.GETALL_SUCCESS, productions } }
    function failure(error) { return { type: productionsConstants.GETALL_FAILURE, error } }
}

function getById(id) {

    return dispatch => {
        dispatch(request(id));
/*
        productionsService.getById(id)
            .then(
                production =>  { dispatch(success(production)) },
                error => dispatch(failure(id, error.toString()))
            );*/
    };

    function request(id) { return { type: productionsConstants.GET_REQUEST } }
    function success(production) { return { type: productionsConstants.GET_SUCCESS, production } }
    function failure(id, error) { return { type: productionsConstants.GET_FAILURE, id, error } }
}



