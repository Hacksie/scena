import { createStore, applyMiddleware } from 'redux';
// import { compose } from 'react-redux';
import { compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

const firebaseConfig = {
    apiKey: "AIzaSyCCLfnDnspvnB0KevGRmr6HQ0Cd3QiN9ZA",
    authDomain: "scena-b1612.firebaseapp.com",
    projectId: "scena-b1612",
    storageBucket: "scena-b1612.appspot.com",
    messagingSenderId: "244656934298",
    appId: "1:244656934298:web:84cdf46c9934205179be23"
  };

  const middleware = [
    thunk.withExtraArgument({ getFirestore }),
    // This is where you add other middleware like redux-observable
  ];  

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
        reduxFirestore(firebaseConfig),
      ),
);