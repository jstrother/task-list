// components/index.jsx
// top-level react component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../flow/store.js';
import App from './app.jsx';
import TodoSocketListeners from '../socket-listeners/task-listener.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

TodoSocketListeners(store);
injectTapEventPlugin();

ReactDOM.render(
	<Provider store={store} >
		<MuiThemeProvider muiTheme={getMuiTheme()}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);