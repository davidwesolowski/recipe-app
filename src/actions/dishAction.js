import { SET_ADD_DISH } from './actionsDefinition';
export const addDish = dish => ({
	type: SET_ADD_DISH,
	payload: dish
});
