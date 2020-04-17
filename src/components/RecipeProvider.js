import React, { createContext, useReducer } from 'react';
import dishesReducer from '../reducers/dishesReducer';
import filtersReducer from '../reducers/filtersReducer';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
	const [dishes, dishesDispatch] = useReducer(dishesReducer, []);
	const [filters, filtersDispatch] = useReducer(filtersReducer, {});

	return (
		<RecipeContext.Provider
			value={{
				dishes,
				dishesDispatch,
				filters,
				filtersDispatch
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
