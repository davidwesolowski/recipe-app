import { SET_CATEGORY, REMOVE_CATEGORY } from './actionsDefinition';

export const setCategory = category => ({
	type: SET_CATEGORY,
	payload: category
});

export const removeCategory = category => ({
	type: REMOVE_CATEGORY,
	payload: category
});
