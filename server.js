// server.js
// top-level back-end

const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const r = require('rethinkdb');
const changefeedSocketEvents = require('./socket-events.js');
const PORT = 80;

app.use(express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

r.connect({ 
	host: '52.42.203.151',
	db: 'taskList' })

.then(function(connection) {
	io.on('connection', function (socket) {

		socket.on('task:client:insert', function(task) {
			r.table('tasks').insert(task).run(connection);
		});

		socket.on('task:client:update', function(task) {
			let updateID = task.id;
			delete task.id;
			r.table('tasks').get(updateID).update(task).run(connection);
		});

		socket.on('task:client:delete', function(task) {
			let deleteID = task.id;
			delete task.id;
			r.table('tasks').get(deleteID).delete().run(connection);
		});

		r.table('tasks').changes({ includeInitial: true, squash: true }).run(connection)
		.then(changefeedSocketEvents(socket, 'task'));
	});

	server.listen(PORT);
})

.error(function(error) {
	console.log('Error connecting to RethinkDB!');
	console.log(error);
});