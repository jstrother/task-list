// imported into index.jsx

import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers.js';
import createLogger from 'redux-logger';

const logger = createLogger();

export default createStore(reducers, applyMiddleware(logger));