import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database';
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable

import {
    ReactReduxFirebaseProvider,
    firebaseReducer
  } from 'react-redux-firebase'
  import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

  const firebaseConfig = {
    apiKey: "AIzaSyCCLfnDnspvnB0KevGRmr6HQ0Cd3QiN9ZA",
    authDomain: "scena-b1612.firebaseapp.com",
    projectId: "scena-b1612",
    storageBucket: "scena-b1612.appspot.com",
    messagingSenderId: "244656934298",
    appId: "1:244656934298:web:84cdf46c9934205179be23"
  };
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  enableClaims: true // Get custom claims along with the profile
}


// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }
  


configureFakeBackend();

render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
        <CssBaseline />
        <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('app')
);