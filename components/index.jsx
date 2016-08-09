// top-level react component

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from '../flow/store.js';
import App from './app.jsx';
import TaskListSocketListeners from '../socket-listeners/task-listener.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

TaskListSocketListeners(store);
injectTapEventPlugin();

ReactDOM.render(
	<Provider store={store} >
		<MuiThemeProvider muiTheme={getMuiTheme()} >
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);