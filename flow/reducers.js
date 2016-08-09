// imported into state.js
// only one reducer brought in for now, but i might try to practice with doing a users list with this later

import {combineReducers} from 'redux';
import tasksReducer from './task-reducer.js';

const reducers = combineReducers({
	tasksReducer
});

export default reducers;