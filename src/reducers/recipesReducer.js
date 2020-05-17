import {
	ADD_RECIPE,
	EDIT_RECIPE,
	REMOVE_RECIPE,
	SET_RECIPE
} from '../actions/actionsDefinition';

const recipesReducer = (state = [], action) => {
	switch (action.type) {
		case SET_RECIPE:
			return action.payload;
		case ADD_RECIPE:
			return [
				...state,
				{
					...action.payload
				}
			];
		case EDIT_RECIPE:
			return state.map(dish => {
				if (dish._id == action.payload._id) {
					return {
						...dish,
						...action.payload
					};
				} else {
					return dish;
				}
			});
		case REMOVE_RECIPE:
			return state.filter(dish => dish._id != action.payload);
		default:
			return state;
	}
};

export default recipesReducer;
