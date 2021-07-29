import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../Components/History';
//import { alertActions } from '../_actions';

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
import { PrivateRoute } from '../Components/PrivateRoute';
import { AlertBar } from '../Components/Alerts';

import { makeStyles, useTheme } from '@material-ui/core/styles';


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



    return (
        <Router history={history}>
            <AlertBar />
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