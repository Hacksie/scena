import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { history } from '../Components/History';
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

function App() {
    return (
        <Router history={history}>
            <AlertBar />
            <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/production" component={ProductionPage} />
                <PrivateRoute exact path="/production/:id" component={ProductionPage} />
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