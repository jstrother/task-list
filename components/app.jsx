// components/app.jsx
// imported into index.jsx

import React from 'react';
import AppBar from 'material-ui/AppBar';
import TaskList from './task-list.jsx';
import AddTask from './add-task.jsx';

import { connect } from 'react-redux';

class Main extends React.Component {
	render() {
		return (
			<div>
				<AppBar title="Task List" iconClassNameRight="muidocs-icon-navigation-expand-more" />
				<TaskList tasks={this.props.tasks} />
				<AddTask />
			</div>
		);
	}
}

function mapStateToProps(tasks) {
	console.log(tasks);
	return { tasks };
}

export default connect(mapStateToProps)(Main);