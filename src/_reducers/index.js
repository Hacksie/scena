import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { company } from './company.reducer';
import { alert } from './alert.reducer';
import { team } from './team.reducer';
import { productions } from './productions.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    company,
    users,
    alert,
    productions,
    team,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;