// imported into index.jsx

import io from 'socket.io-client';

const socket = io.connect('/');

export default function(store) {
	socket.on('task:insert', function(task) {
		store.dispatch({
			type: 'task:insert',
			task: task
		});
	});
	socket.on('task:update', function(task) {
		store.dispatch({
			type: 'task:update',
			task: task
		});
	});
	socket.on('task:delete', function(task) {
		store.dispatch({
			type:'task:delete',
			task: task
		});
	});
}