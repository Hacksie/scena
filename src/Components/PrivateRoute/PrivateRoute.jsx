import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase'

function PrivateRoute({ component: Component, roles, ...rest }) {
    const auth = useSelector(state => state.firebase.auth)
    

    return (
        <Route {...rest} render={props => {
            if (isLoaded(auth) && isEmpty(auth)) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };