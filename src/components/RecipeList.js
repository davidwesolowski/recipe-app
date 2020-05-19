import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RecipeContext } from './RecipeProvider';
import Recipe from './Recipe';
import { setRecipe } from '../actions/recipeAction';
import { setCategory } from '../actions/categoryAction';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		padding: '10px 5px'
	},
	container: {
		height: '100%',
		overflowY: 'auto'
	},
	noRecipe: {
		fontFamily: 'Oswald, sans-serif',
		fontWeight: '400',
		fontSize: '1.5rem',
		justifySelf: 'center'
	}
}));

const RecipeList = ({ searchingWord }) => {
	const classes = useStyles();
	const {
		recipes,
		categories,
		recipesDispatch,
		categoriesDispatch
	} = useContext(RecipeContext);
	const filterValues = Object.values(categories).every(
		value => value === false
	);
	const { push } = useHistory();

	useEffect(() => {
		if (!recipes.length) {
			(async function() {
				const token = JSON.parse(localStorage.getItem('authToken'));
				axios.defaults.headers.common.Authorization = `Bearer ${token}`;
				const {
					data: { recipesGet, jwtError }
				} = await axios.get('/recipes');
				if (jwtError) {
					localStorage.removeItem('authToken');
					push('/');
					return;
				}
				if (recipesGet) {
					const categories = recipesGet.reduce(
						(acc, curr) => ({
							...acc,
							[curr.kind]: false
						}),
						{}
					);
					recipesDispatch(setRecipe(recipesGet));
					categoriesDispatch(setCategory(categories));
				}
			})();
		}
	}, []);
	return (
		<Grid item xs={12} sm={9} md={10} lg={10}>
			<Paper className={classes.container}>
				<Grid container className={classes.root}>
					{recipes.length > 0 ? (
						filterValues === true ? (
							recipes
								.filter(recipe =>
									recipe.name
										.toUpperCase()
										.includes(searchingWord.toUpperCase())
								)
								.map(recipe => (
									<Recipe key={recipe._id} recipe={recipe} />
								))
						) : (
							recipes
								.filter(recipe => {
									if (
										recipe.kind in categories &&
										categories[recipe.kind] &&
										recipe.name
											.toUpperCase()
											.includes(
												searchingWord.toUpperCase()
											)
									)
										return true;
									return false;
								})
								.map(recipe => (
									<Recipe key={recipe._id} recipe={recipe} />
								))
						)
					) : (
						<div className={classes.noRecipe}>
							Jeszcze nie wprowadziłeś przepisu, możesz go dodać
							klikając plusik w prawym górnym rogu okna. &nbsp;
							<span role="img" aria-label="smile">
								😉
							</span>
						</div>
					)}
				</Grid>
			</Paper>
		</Grid>
	);
};

export default RecipeList;
