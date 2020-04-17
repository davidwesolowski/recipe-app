import {
	ADD_DISH,
	EDIT_DISH,
	REMOVE_DISH,
	SET_RECIPE
} from '../actions/actionsDefinition';

const dishesReducer = (state = [], action) => {
	switch (action.type) {
		case SET_RECIPE:
			return action.payload;
		case ADD_DISH:
			return [
				...state,
				{
					...action.payload
				}
			];
		case EDIT_DISH:
			return state.map(dish => {
				if (dish.id == action.payload.id) {
					return {
						...dish,
						...action.payload
					};
				} else {
					return dish;
				}
			});
		case REMOVE_DISH:
			return state.filter(dish => dish.id != action.payload);
		default:
			return state;
	}
};

export default dishesReducer;
