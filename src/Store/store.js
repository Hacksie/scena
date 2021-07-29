import { createStore, applyMiddleware } from 'redux';
// import { compose } from 'react-redux';
import { compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import rootReducer from './rootReducer';
import { firebaseConfig } from '../firebaseConfig';

const loggerMiddleware = createLogger();



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