import { v4 as uuidv4 } from 'uuid';
import { SET_ADD_DISH } from '../actions/actionsDefinition';

const dishesReducer = (state = [], action) => {
	switch (action.type) {
		case SET_ADD_DISH:
			return [
				...state,
				{
					id: uuidv4(),
					...action.payload
				}
			];
		default:
			return state;
	}
};

export default dishesReducer;
