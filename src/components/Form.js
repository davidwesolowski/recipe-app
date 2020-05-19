import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	TextField,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Button,
	FormHelperText,
	IconButton,
	Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Close as CloseIcon } from '@material-ui/icons';
import { FaFileUpload } from 'react-icons/fa';
import { RecipeContext } from './RecipeProvider';
import { addRecipe, editRecipe } from '../actions/recipeAction';
import { setCategory } from '../actions/categoryAction';

const useStyles = makeStyles(theme => ({
	addButton: {
		marginLeft: '5px'
	},
	addIcon: {
		color: '#e1f5fe'
	},
	closeButton: {
		padding: 0
	},
	closeIcon: {
		color: '#301b70'
	},
	paperScrollPaper: {
		width: '100%',
		margin: 0,
		[theme.breakpoints.up('md')]: {
			width: '50vw',
			margin: 32
		}
	},
	submitButton: {
		backgroundColor: '#2196f3',
		color: 'white',
		'&:hover': {
			backgroundColor: '#3f51b5'
		},
		marginTop: 10
	},
	formContent: {
		display: 'flex',
		flexDirection: 'column',
		flex: '0 0 60%'
	},
	formControl: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	fileUploadButton: {
		display: 'flex',
		flex: '0 0 40%',
		height: '50%',
		justifyContent: 'center',
		transition: 'transform 200ms ease-out',
		'&:hover': {
			backgroundColor: 'transparent',
			transform: 'scale(1.1)'
		}
	},
	fileUploadIcon: {
		width: '80%',
		height: '80%',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	field: {
		marginTop: '1rem'
	},
	alert: {
		marginTop: '.5rem'
	},
	dialogHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%'
	},
	imgBar: {
		display: 'flex',
		flexDirection: 'column'
	},
	'.MuiInputLabel-formControl': {
		fontSize: '1.3rem'
	},
	'.MuiInputBase-input': {
		fontSize: '1.25rem'
	},
	[theme.breakpoints.up('md')]: {
		'.MuiInputLabel-formControl': {
			fontSize: '1.1rem'
		},
		'.MuiInputBase-input': {
			fontSize: '1rem'
		}
	}
}));

const Form = props => {
	const classes = useStyles();
	const { open, setOpen, setRecipeDetail, recipe: editedRecipe } = props;
	const defaultRecipe = {
		name: '',
		kind: '',
		img: '',
		ingredients: '',
		recipe: ''
	};
	const defaultTextFieldState = {
		name: false,
		kind: false,
		img: false,
		ingredients: false,
		recipe: false
	};
	const [recipe, setRecipe] = useState(defaultRecipe);
	const [alertOpen, setAlertOpen] = useState(false);
	const [newCategory, setNewCategory] = useState(false);
	const [textFieldsState, setTextFieldsState] = useState(
		defaultTextFieldState
	);
	const file = useRef(null);
	file.current = recipe.img || null;
	const { categories, categoriesDispatch, recipesDispatch } = useContext(
		RecipeContext
	);
	const { push } = useHistory();

	const addNewRecipe = async recipe => {
		try {
			const token = JSON.parse(localStorage.getItem('authToken'));
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			const {
				data: { jwtError, recipe: newRecipe }
			} = await axios.post('/recipe', recipe);
			if (jwtError) {
				localStorage.removeItem('authToken');
				push('/');
			}
			if (newRecipe) {
				recipesDispatch(addRecipe(newRecipe));
			}
		} catch (e) {
			console.error(e); //eslint-disable-line
		}
	};

	const editOldRecipe = async recipe => {
		try {
			const token = JSON.parse(localStorage.getItem('authToken'));
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			const {
				data: { jwt, recipe: editedRecipe }
			} = await axios.patch(`/recipe/${recipe._id}`, recipe);
			if (jwt) {
				localStorage.removeItem('authToken');
				push('/');
			}
			if (editedRecipe) {
				setRecipeDetail(editedRecipe);
				recipesDispatch(editRecipe(editedRecipe));
			}
		} catch (e) {
			console.log(e); //eslint-disable-line
		}
	};

	const handleInput = name => event => {
		event.persist();
		if (event.target.value === 'Create new') {
			setNewCategory(true);
		} else {
			setRecipe(prev => ({
				...prev,
				[name]: event.target.value
			}));
		}
	};
	const handleFile = event => {
		if (event.target.files && event.target.files[0]) {
			const fileRead = event.target.files[0];
			const reader = new FileReader();
			reader.onload = event => {
				file.current = event.target.result;
			};
			reader.readAsDataURL(fileRead);
		}
	};
	const handleSubmit = event => {
		event.preventDefault();
		recipe.img = file.current;
		const textFields = Object.keys(textFieldsState).reduce(
			(acc, curr) => ({
				...acc,
				[curr]: !recipe[curr]
			}),
			{}
		);
		if (
			recipe.name &&
			recipe.kind &&
			recipe.img &&
			recipe.ingredients &&
			recipe.recipe
		) {
			if (!recipe._id) {
				addNewRecipe(recipe);
			} else {
				editOldRecipe(recipe);
			}
			setAlertOpen(true);
			categoriesDispatch(setCategory({ [recipe.kind]: false }));
			setTimeout(() => {
				setOpen(!open);
				setRecipe(defaultRecipe);
				setTextFieldsState(defaultTextFieldState);
				setNewCategory(false);
				setAlertOpen(false);
				file.current = null;
			}, 1000);
		} else {
			setTextFieldsState(textFields);
		}
	};

	/*eslint-disable*/
	useEffect(() => {
		setRecipe(editedRecipe || defaultRecipe);
	}, [props]);
	/*eslint-enable*/
	return (
		<Dialog
			open={open}
			onClose={() => {
				setOpen(!open);
				setRecipe(editedRecipe || defaultRecipe);
				setTextFieldsState(defaultTextFieldState);
				setNewCategory(false);
				file.current = recipe.img || null;
			}}
			scroll="paper"
			classes={{ paperScrollPaper: classes.paperScrollPaper }}
		>
			<DialogTitle>
				<div className={classes.dialogHeader}>
					<Typography>
						{editedRecipe ? 'Edytuj przepis' : 'Dodaj przepis:'}
					</Typography>
					<IconButton
						className={classes.closeButton}
						onClick={() => {
							setOpen(!open);
							setRecipe(editedRecipe || defaultRecipe);
							setTextFieldsState(defaultTextFieldState);
							setNewCategory(false);
							file.current = recipe.img || null;
						}}
					>
						<CloseIcon
							className={classes.closeIcon}
							fontSize="large"
						/>
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent dividers>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<div className={classes.formControl}>
							<div className={classes.formContent}>
								<FormControl error={textFieldsState.name}>
									<TextField
										label="Nazwa"
										className={classes.field}
										value={recipe.name}
										onChange={handleInput('name')}
										error={textFieldsState.name}
									/>
									<FormHelperText>
										{textFieldsState.name && 'Brak nazwy'}
									</FormHelperText>
								</FormControl>
								<FormControl error={textFieldsState.kind}>
									{newCategory ? (
										<TextField
											label="Kategoria"
											className={classes.field}
											value={recipe.kind}
											onChange={handleInput('kind')}
											error={textFieldsState.kind}
										/>
									) : (
										<>
											<InputLabel id="kind-id" shrink>
												Kategoria
											</InputLabel>
											<Select
												value={recipe.kind}
												onChange={handleInput('kind')}
												labelId="kind-id"
												className={classes.field}
												error={textFieldsState.kind}
											>
												<MenuItem value="Create new">
													Dodaj nową kategorię
												</MenuItem>

												{Object.keys(categories).map(
													filter => (
														<MenuItem
															key={filter}
															value={filter}
														>
															{filter
																.charAt(0)
																.toUpperCase() +
																filter.substring(
																	1,
																	filter.length
																)}
														</MenuItem>
													)
												)}
											</Select>
										</>
									)}
									<FormHelperText>
										{textFieldsState.kind &&
											'Brak kategorii'}
									</FormHelperText>
								</FormControl>
								<FormControl
									error={textFieldsState.ingredients}
								>
									<TextField
										multiline
										label="Składniki"
										className={classes.field}
										value={recipe.ingredients}
										onChange={handleInput('ingredients')}
										error={textFieldsState.ingredients}
									/>
									<FormHelperText>
										{textFieldsState.ingredients &&
											'Brak składników'}
									</FormHelperText>
								</FormControl>
								<FormControl error={textFieldsState.recipe}>
									<TextField
										multiline
										label="Przepis"
										className={classes.field}
										value={recipe.recipe}
										onChange={handleInput('recipe')}
										error={textFieldsState.recipe}
									/>
									<FormHelperText>
										{textFieldsState.recipe &&
											'Brak przepisu'}
									</FormHelperText>
								</FormControl>
							</div>
							<div className={classes.imgBar}>
								<FormControl error={textFieldsState.img}>
									<IconButton
										className={classes.fileUploadButton}
									>
										<input
											accept="image/*"
											type="file"
											style={{ display: 'none' }}
											id="icon-button-file"
											onChange={handleFile}
										/>
										<label htmlFor="icon-button-file">
											<FaFileUpload
												className={
													classes.fileUploadIcon
												}
											/>
											<FormHelperText>
												{textFieldsState.img &&
													'Załaduj obrazek'}
											</FormHelperText>
										</label>
									</IconButton>
								</FormControl>
							</div>
						</div>
						<Button className={classes.submitButton} type="submit">
							{editedRecipe ? 'Edytuj' : 'Dodaj'}
						</Button>
					</FormControl>
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						open={alertOpen}
						autoHideDuration={4000}
						onClose={() => setAlertOpen(!alertOpen)}
					>
						<Alert
							variant="filled"
							severity="success"
							className={classes.alert}
						>
							{editedRecipe
								? 'Przepis edytowany pomyślnie'
								: 'Przepis dodany pomyślnie!'}
						</Alert>
					</Snackbar>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default Form;
