// imported into app.jsx

import React from 'react';
import {Table, TableBody} from 'material-ui/Table';
import Task from './task.jsx';

export default class TaskList extends React.Component {
	render() {
		return(
			<Table>
				<TableBody>
					{this.props.tasks.map(function(task) {<Task key={task.id} task={task} />})}
				</TableBody>
			</Table>
		);
	}
}