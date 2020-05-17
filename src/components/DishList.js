import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RecipeContext } from './RecipeProvider';
import Dish from './Dish';
import { setRecipe } from '../actions/dishAction';
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

const DishList = ({ searchingWord }) => {
	const classes = useStyles();
	const { dishes, filters, dishesDispatch, filtersDispatch } = useContext(
		RecipeContext
	);
	const filterValues = Object.values(filters).every(value => value === false);
	const { push } = useHistory();

	useEffect(() => {
		if (!dishes.length) {
			(async function() {
				const token = JSON.parse(localStorage.getItem('authToken'));
				axios.defaults.headers.common.Authorization = `Bearer ${token}`;
				const {
					data: { recipes, jwtError }
				} = await axios.get('http://localhost:3000/recipes');
				if (jwtError) {
					localStorage.removeItem('authToken');
					push('/');
					return;
				}
				if (recipes) {
					const categories = recipes.reduce(
						(acc, curr) => ({
							...acc,
							[curr.kind]: false
						}),
						{}
					);
					dishesDispatch(setRecipe(recipes));
					filtersDispatch(setCategory(categories));
				}
			})();
		}
	}, []);
	return (
		<Grid item xs={12} sm={9} md={10} lg={10}>
			<Paper className={classes.container}>
				<Grid container className={classes.root}>
					{dishes.length > 0 ? (
						filterValues === true ? (
							dishes
								.filter(dish =>
									dish.name
										.toUpperCase()
										.includes(searchingWord.toUpperCase())
								)
								.map(dish => (
									<Dish key={dish._id} dish={dish} />
								))
						) : (
							dishes
								.filter(dish => {
									if (
										dish.kind in filters &&
										filters[dish.kind] &&
										dish.name
											.toUpperCase()
											.includes(
												searchingWord.toUpperCase()
											)
									)
										return true;
									return false;
								})
								.map(dish => (
									<Dish key={dish._id} dish={dish} />
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

export default DishList;
