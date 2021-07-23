import { combineReducers } from 'redux';

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
    team
});

export default rootReducer;