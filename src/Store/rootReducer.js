import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

// import { authentication } from '../Components/User/authentication.reducer';
// import { registration } from '../Components/User/registration.reducer';
import { users } from '../Components/User/reducer';
import { team } from '../Components/Team/reducer';
import { productions } from '../Components/Production/reducer';
import { alert } from '../Components/Alerts/reducer';
import { company } from '../Components/Company/reducer';

const rootReducer = combineReducers({
    // authentication,
    // registration,
    company,
    users,
    alert,
    productions,
    team,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;