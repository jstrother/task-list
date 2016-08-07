const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const r = require('rethinkdb');

const changefeedSocketEvents = require('./socket-events.js');

app.use(express.static('public'));

app.get('*', function(req, res) {
	res.sendFile(path.join(`${__dirname}/index.html`));
});

r.connect({db: 'taskList'})
	.then(function(connection) {
		io.on('connection', function(socket) {
			socket.on('task:client:insert', function(task) {
				r.table('tasks').insert(task).run(connection);
			});
			socket.on('task:client:update', function(task) {
				let id = task.id;
				delete task.id;
				r.table('tasks').get(id).update(task).run(connection);
			});
			socket.on('task:client:delete', function(task) {
				let id = task.id;
				delete task.id;
				r.table('tasks').get(id).delete().run(connection);
			});
			r.table('tasks').changes({
				includeInitial: true,
				squash: true
			}).run(connection)
			.then(changefeedSocketEvents(socket, 'task'));
		});
		server.listen(9000);
	})
	.error(function(error) {
		console.log('Error connecting to RethinkDB');
		console.log(error);
	});