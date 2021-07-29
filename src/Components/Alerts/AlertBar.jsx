import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


import { history } from '../History';
//import { alertActions } from '../_actions';

//import { alertActions } from './alert.actions';
import { alertActions } from '.';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function AlertBar() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        dispatch(alertActions.clear());
    };



    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Snackbar open={alert && alert.message !== undefined} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.type && alert.type.replace('alert-', '')}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
}

export { AlertBar };