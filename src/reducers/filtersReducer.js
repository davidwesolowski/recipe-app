import { SET_CATEGORY, REMOVE_CATEGORY } from '../actions/actionsDefinition';
const filtersReducer = (state, action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return {
				...state,
				...action.payload
			};
		case REMOVE_CATEGORY:
			return Object.keys(state)
				.filter(category => category !== action.payload)
				.reduce(
					(acc, curr) => ({
						...acc,
						[curr]: state[curr]
					}),
					{}
				);
		default:
			return state;
	}
};

export default filtersReducer;
