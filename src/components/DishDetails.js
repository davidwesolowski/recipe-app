import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	Paper,
	Grid,
	Typography,
	IconButton,
	Dialog,
	DialogTitle,
	Button,
	DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HomeRounded, Edit, Delete } from '@material-ui/icons';
import { RecipeContext } from './RecipeProvider';
import Form from './Form';
import Dish from './Dish';
import { removeDish } from '../actions/dishAction';
import { removeCategory } from '../actions/categoryAction';

const useStyles = makeStyles(theme => ({
	contentDetails: {
		minWidth: '100vw',
		minHeight: 'calc(100% - 75px - 64px)'
	},
	recipeImgContainer: {
		height: 250,
		padding: 10,
		display: 'flex',
		justifyContent: 'center'
	},
	recipeImg: {
		height: '100%',
		width: '80%',
		borderRadius: '10%',
		objectFit: 'cover',
		objectPosition: 'center 40%',
		[theme.breakpoints.up('sm')]: {
			width: '90%'
		}
	},
	recipeHeader: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'flex-end',
		marginRight: 10,
		[theme.breakpoints.up('sm')]: {
			justifyContent: 'center',
			margin: 0
		}
	},
	recipeName: {
		fontFamily: 'Oswald, sans-serif',
		fontWeight: '500',
		fontSize: '2rem',
		letterSpacing: 1
	},
	icons: {
		position: 'absolute',
		left: 2,
		top: 2,
		[theme.breakpoints.up('sm')]: {
			left: 5,
			top: 5
		}
	},
	detailsIcon: {
		height: '1.8rem',
		width: '1.8rem',
		transition: 'all .5s ease',
		fill: '#0e4686',
		'&:hover': {
			height: '2rem',
			width: '2rem'
		},
		'&:active': {
			color: '#283593'
		}
	},
	ingredientsContainer: {
		diplay: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginLeft: 15
	},
	title: {
		fontFamily: 'Oswald, sans-serif',
		fontWeight: '500',
		fontSize: '1.5rem'
	},
	otherRecipes: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 0,
		marginLeft: 15,
		maxHeight: 500,
		[theme.breakpoints.up('sm')]: {
			marginLeft: 0,
			padding: 10
		}
	},
	description: {
		fontFamily: 'Frank Ruhl Libre, serif',
		fontWeight: '400',
		fontSize: '1.2rem',
		whiteSpace: 'pre-wrap'
	},
	dishesPane: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: 420,
		overflowY: 'auto',
		[theme.breakpoints.up('sm')]: {
			maxHeight: 420
		}
	}
}));

const DishDetails = ({ dish, history: { push }, match: { params } }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [remove, setRemove] = useState(false);
	const [recipeDetail, setRecipeDetail] = useState(dish);
	const { dishes, dishesDispatch, filtersDispatch } = useContext(
		RecipeContext
	);
	const handleRemoveDish = async id => {
		try {
			const token = JSON.parse(localStorage.getItem('authToken'));
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			const {
				data: { deletedRecipe, jwtError }
			} = await axios.delete('http://localhost:3000/recipe', {
				data: { id }
			});
			if (jwtError) {
				localStorage.removeItem('authToken');
				push('/');
			}
			if (deletedRecipe) {
				filtersDispatch(removeCategory(dish.kind));
				dishesDispatch(removeDish(id));
				push('/przepisy');
			}
		} catch (e) {
			console.log(e); //eslint-disable-line
		}
	};

	useEffect(() => {
		(async function() {
			if (!dish) {
				const token = JSON.parse(localStorage.getItem('authToken'));
				axios.defaults.headers.common.Authorization = `Bearer ${token}`;
				const {
					data: { jwtError, recipe: newRecipe }
				} = await axios.get(
					`http://localhost:3000/recipe/${params.id}`
				);
				if (jwtError) {
					localStorage.removeItem('authToken');
					push('/');
				}
				setRecipeDetail(newRecipe);
			}
		})();
	}, []);

	return (
		<>
			{recipeDetail && (
				<Paper className={classes.contentDetails}>
					<div className={classes.recipeHeader}>
						<Typography className={classes.recipeName}>
							{recipeDetail.name}
						</Typography>
						<div className={classes.icons}>
							<Link to="/przepisy">
								<IconButton>
									<HomeRounded
										className={classes.detailsIcon}
									/>
								</IconButton>
							</Link>
							<IconButton onClick={() => setOpen(!open)}>
								<Edit className={classes.detailsIcon} />
							</IconButton>
							<IconButton onClick={() => setRemove(true)}>
								<Delete className={classes.detailsIcon} />
							</IconButton>
							<Dialog
								open={remove}
								onClose={() => setRemove(false)}
							>
								<DialogTitle>
									Czy na pewno chcesz usunąć ten przepis?
								</DialogTitle>
								<DialogActions>
									<Button
										onClick={() =>
											handleRemoveDish(dish._id)
										}
									>
										Usuń
									</Button>
									<Button onClick={() => setRemove(false)}>
										Anuluj
									</Button>
								</DialogActions>
							</Dialog>
						</div>
					</div>
					<Grid container>
						<Grid item xs={12} sm={5} md={3} lg={3}>
							<div className={classes.recipeImgContainer}>
								<img
									src={
										recipeDetail.img
											? recipeDetail.img
											: '/img/loader.gif'
									}
									alt={`Przepis: ${recipeDetail.name}`}
									className={classes.recipeImg}
								/>
							</div>
							<div className={classes.ingredientsContainer}>
								<Typography className={classes.title}>
									Składniki:
								</Typography>
								<Typography className={classes.description}>
									{recipeDetail.ingredients}
								</Typography>
							</div>
						</Grid>
						<Grid item xs={12} sm={7} md={6} lg={6}>
							<div className={classes.otherRecipes}>
								<Typography className={classes.title}>
									Przepis:
								</Typography>
								<Typography className={classes.description}>
									{recipeDetail.recipe}
								</Typography>
							</div>
						</Grid>
						<Grid item xs={12} md={3} lg={3}>
							<div className={classes.otherRecipes}>
								<Typography className={classes.title}>
									Inne przepisy:
								</Typography>
								<div className={classes.dishesPane}>
									{dishes.length &&
										dishes
											.filter(
												dishElement =>
													dishElement.kind ===
														recipeDetail.kind &&
													dishElement.name !==
														recipeDetail.name
											)
											.map(dishElement => (
												<Dish
													key={dishElement._id}
													dish={dishElement}
												/>
											))}
								</div>
							</div>
						</Grid>
					</Grid>
				</Paper>
			)}
			<Form open={open} setOpen={setOpen} dish={dish} />
		</>
	);
};

export default DishDetails;
