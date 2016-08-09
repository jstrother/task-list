// imported into task-list.jsx

import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import io from 'socket.io-client';

const socket = io.connect('/');

export default class Task extends React.Component {
	handleCheck = task => {
		socket.emit('task:client:update', {
			completed: !task.completed,
			id: task.id
		});
	};

	handleDelete = task => {
		socket.emit('task:client:delete', task);
	};

	render() {
		return(
			<TableRow>
				<TableRowColumn>
					<Checkbox label={this.props.task.name} checked={this.props.task.completed} onCheck={this.handleCheck.bind(this, this.props.task)} />
				</TableRowColumn>
				<TableRowColumn>
					<IconButton iconClassName="fa fa-trash" onFocus={this.handleDelete.bind(this, this.props.task)} />
				</TableRowColumn>
			</TableRow>
		);
	}
}