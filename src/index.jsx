import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>,
    document.getElementById('app')
);