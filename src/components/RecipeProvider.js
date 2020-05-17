import React, { createContext, useReducer } from 'react';
import recipesReducer from '../reducers/recipesReducer';
import categoriesReducer from '../reducers/categoriesReducer';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
	const [recipes, recipesDispatch] = useReducer(recipesReducer, []);
	const [categories, categoriesDispatch] = useReducer(categoriesReducer, {});

	return (
		<RecipeContext.Provider
			value={{
				recipes,
				recipesDispatch,
				categories,
				categoriesDispatch
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
