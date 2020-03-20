import { SET_FILTERS } from '../actions/actionsDefinition';
const filtersReducer = (state, action) => {
	switch (action.type) {
		case SET_FILTERS:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};

export default filtersReducer;
