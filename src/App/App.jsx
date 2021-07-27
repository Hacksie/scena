import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../Views/HomePage';
import { LoginPage } from '../Views/LoginPage';
import { RegisterPage } from '../Views/RegisterPage';
import { AccountPage } from '../Views/AccountPage';
import { CompanyPage } from '../Views/CompanyPage';
import { ProductionPage } from '../Views/ProductionPage';
import { ScenesPage } from '../Views/ScenesPage';
import { ScriptsPage } from '../Views/ScriptsPage';
import { TeamPage } from '../Views/TeamPage';
import { SettingsPage } from '../Views/SettingsPage';
import MuiAlert from '@material-ui/lab/Alert';



import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import { makeStyles, useTheme } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const drawerWidth = 58;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },

    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },

    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        overflow: 'hidden',
        backgroundColor: '#CCC'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function App(props) {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        //   if (reason === 'clickaway') {
        //     return;
        //   }

        dispatch(alertActions.clear());


    };


    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Router history={history}>
            <Snackbar open={alert && alert.message !== undefined} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert.type && alert.type.replace('alert-','')}>
                    {alert.message}
                </Alert>
            </Snackbar>
            <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/production" component={ProductionPage} />
                <PrivateRoute exact path="/scenes" component={ScenesPage} />
                <PrivateRoute exact path="/scripts" component={ScriptsPage} />
                <PrivateRoute exact path="/team" component={TeamPage} />
                <PrivateRoute exact path="/settings" component={SettingsPage} />
                <PrivateRoute exact path="/company" component={CompanyPage} />
                <PrivateRoute exact path="/account" component={AccountPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export { App };