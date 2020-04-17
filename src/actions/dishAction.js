import {
	ADD_DISH,
	EDIT_DISH,
	REMOVE_DISH,
	SET_RECIPE
} from './actionsDefinition';

export const addDish = dish => ({
	type: ADD_DISH,
	payload: dish
});

export const editDish = dish => ({
	type: EDIT_DISH,
	payload: dish
});

export const removeDish = id => ({
	type: REMOVE_DISH,
	payload: id
});

export const setRecipe = recipes => ({
	type: SET_RECIPE,
	payload: recipes
});
