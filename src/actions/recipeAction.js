import {
	ADD_RECIPE,
	EDIT_RECIPE,
	REMOVE_RECIPE,
	SET_RECIPE
} from './actionsDefinition';

export const addRecipe = recipe => ({
	type: ADD_RECIPE,
	payload: recipe
});

export const editRecipe = recipe => ({
	type: EDIT_RECIPE,
	payload: recipe
});

export const removeRecipe = id => ({
	type: REMOVE_RECIPE,
	payload: id
});

export const setRecipe = recipes => ({
	type: SET_RECIPE,
	payload: recipes
});
