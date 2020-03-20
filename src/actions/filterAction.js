import { SET_FILTERS } from './actionsDefinition';

export const setFilterAction = filters => ({
	type: SET_FILTERS,
	payload: filters
});
