import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import RecipeProvider from './components/RecipeProvider';
import dotenv from 'dotenv';

dotenv.config();

render(
	<RecipeProvider>
		<App />
	</RecipeProvider>,
	document.getElementById('root')
);
