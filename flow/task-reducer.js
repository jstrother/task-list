// imported into reducers.js

const tasks = (state = [], action) => {
	const taskIndex = () => {
		return state.findIndex(thisTask => {
			return thisTask && thisTask.id === action.task.id;
		});
	};

	switch(action.type) {
		case 'task:insert':
			return taskIndex() < 0 ? [...state, action.task] : state;

		case 'task:update':
			var index = taskIndex();
			if (index > -1) {
				let updatedTask = Object.assign({}, state[index], action.task);
				return [...state.slice(0, index), updatedTask, ...state.slice(index + 1)];
			}
			else {
				return state;
			}

		case 'task:delete':
			var index = taskIndex();
			if (index > -1) {
				return [...state.slice(0, index), ...state.slice(index + 1)];
			}
			else {
				return state;
			}

		default:
			return state;
	}
};

export default tasks;