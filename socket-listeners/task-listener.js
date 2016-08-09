// imported into index.jsx

import io from 'socket.io-client';

const socket = io.connect('/');

export default store => {
	socket.on('task:insert', task => {
		store.dispatch({
			type: 'task:insert',
			task: task
		});
	});
	socket.on('task:update', task => {
		store.dispatch({
			type: 'task:update',
			task: task
		});
	});
	socket.on('task:delete', task => {
		store.dispatch({
			type:'task:delete',
			task: task
		});
	});
}