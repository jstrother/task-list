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
			})
		});
	})