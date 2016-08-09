import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../flow/store.js';
import TaskList from './task-list.jsx';
import TaskListSocketListeners from '../socket-listeners/task-listener.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

TaskListSocketListeners(store);
injectTapEventPlugin();

ReactDOM.render(
	<Provider store={store} >
		<TaskList />
	</Provider>,
	document.getElementById('app')
);