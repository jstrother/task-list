// top-level back-end file

const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const r = require('rethinkdb');
const changefeedSocketEvents = require('./socket-events.js');

app.use(express.static('public'));

app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

r.connect({db: 'taskList'})
	.then(connection => {
		io.on('connection', socket => {
			socket.on('task:client:insert', task => {
				r.table('tasks').insert(task).run(connection);
			});
			socket.on('task:client:update', task => {
				let id = task.id;
				delete task.id;
				r.table('tasks').get(id).update(task).run(connection);
			});
			socket.on('task:client:delete', task => {
				let id = task.id;
				delete task.id;
				r.table('tasks').get(id).delete().run(connection);
			});
			r.table('tasks').changes({
				includeInitial: true,
				squash: true
			})
			.run(connection)
			.then(changefeedSocketEvents(socket, 'task'));
		});
		server.listen(9000);
	})
	.error(error => {
		console.log('Error connecting to RethinkDB');
		console.log(error);
	});