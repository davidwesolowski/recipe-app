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
			return state.map(recipe => {
				if (recipe._id == action.payload._id) {
					return {
						...recipe,
						...action.payload
					};
				} else {
					return recipe;
				}
			});
		case REMOVE_RECIPE:
			return state.filter(recipe => recipe._id != action.payload);
		default:
			return state;
	}
};

export default recipesReducer;
