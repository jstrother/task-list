// imported into state.js
// only one reducer brought in for now, but i might try to practice with doing a users list with this later

import {combineReducers} from 'redux';
import taskReducer from './task-reducer.js';

const reducers = combineReducers({
	taskReducer
});

export default reducers;