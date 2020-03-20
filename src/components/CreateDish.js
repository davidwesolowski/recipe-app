import React, { useState, useContext, useRef } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	IconButton,
	TextField,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Button,
	FormHelperText
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AddCircleRounded, Close as CloseIcon } from '@material-ui/icons';
import { FaFileUpload } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import { ContentContext } from './App';
import { addDish } from '../actions/dishAction';
import { setFilterAction } from '../actions/filterAction';

const useStyles = makeStyles(() => ({
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
		width: '50vw'
	},
	submitButton: {
		backgroundColor: '#2196f3',
		color: 'white',
		'&:hover': {
			backgroundColor: '#3f51b5'
		}
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
	'@global': {
		'.MuiTypography-h6': {
			display: 'flex',
			width: '100%',
			justifyContent: 'space-between'
		}
	}
}));

const CreateDish = () => {
	const classes = useStyles();
	const defaultDish = {
		name: '',
		kind: '',
		img: '',
		ingriedients: '',
		recipe: ''
	};
	const defaultTextFieldState = {
		name: false,
		kind: false,
		img: false,
		ingriedients: false,
		recipe: false
	};
	const [open, setOpen] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [dish, setDish] = useState(defaultDish);
	const [newFilter, setNewFilter] = useState(false);
	const [textFieldsState, setTextFieldsState] = useState(
		defaultTextFieldState
	);
	const file = useRef(null);
	const { filters, filtersDispatch, dishesDispatch } = useContext(
		ContentContext
	);
	const filterTypes = Object.keys(filters);
	const handleInput = name => event => {
		event.persist();
		if (event.target.value === 'Create new') {
			setNewFilter(true);
		} else {
			setDish(prev => ({
				...prev,
				[name]: event.target.value
			}));
		}
	};
	const handleSubmit = event => {
		event.preventDefault();
		dish.img = file.current;
		const textFields = Object.keys(textFieldsState).reduce(
			(acc, curr) => ({
				...acc,
				[curr]: !dish[curr]
			}),
			{}
		);
		if (
			dish.name &&
			dish.kind &&
			dish.img &&
			dish.ingriedients &&
			dish.recipe
		) {
			setAlertOpen(true);
			filtersDispatch(setFilterAction({ [dish.kind]: false }));
			dishesDispatch(addDish(dish));
			setTimeout(() => {
				setOpen(!open);
				setDish(defaultDish);
				setTextFieldsState(defaultTextFieldState);
				setNewFilter(false);
				setAlertOpen(false);
				file.current = null;
			}, 1500);
		} else {
			setTextFieldsState(textFields);
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
	return (
		<>
			<IconButton
				className={classes.button}
				onClick={() => setOpen(!open)}
			>
				<AddCircleRounded
					className={classes.addIcon}
					fontSize="large"
				/>
			</IconButton>
			<Dialog
				open={open}
				onClose={() => {
					setOpen(!open);
					setDish(defaultDish);
					setTextFieldsState(defaultTextFieldState);
					setNewFilter(false);
					file.current = null;
				}}
				scroll="paper"
				classes={{ paperScrollPaper: classes.paperScrollPaper }}
			>
				<DialogTitle>
					<Typography>Dodaj przepis:</Typography>
					<IconButton
						className={classes.closeButton}
						onClick={() => {
							setOpen(!open);
							setDish(defaultDish);
							setTextFieldsState(defaultTextFieldState);
							setNewFilter(false);
							file.current = null;
						}}
					>
						<CloseIcon
							className={classes.closeIcon}
							fontSize="large"
						/>
					</IconButton>
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
											value={dish.name}
											onChange={handleInput('name')}
											error={textFieldsState.name}
										/>
										<FormHelperText>
											{textFieldsState.name &&
												'Brak nazwy'}
										</FormHelperText>
									</FormControl>
									<FormControl error={textFieldsState.kind}>
										{newFilter ? (
											<TextField
												label="Kategoria"
												className={classes.field}
												value={dish.kind}
												onChange={handleInput('kind')}
												error={textFieldsState.kind}
											/>
										) : (
											<>
												<InputLabel id="kind-id" shrink>
													Kategoria
												</InputLabel>
												<Select
													value={dish.kind}
													onChange={handleInput(
														'kind'
													)}
													labelId="kind-id"
													className={classes.field}
													error={textFieldsState.kind}
												>
													<MenuItem value="Create new">
														Dodaj nową kategorię
													</MenuItem>

													{filterTypes.map(filter => (
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
													))}
												</Select>
											</>
										)}
										<FormHelperText>
											{textFieldsState.kind &&
												'Brak kategorii'}
										</FormHelperText>
									</FormControl>
									<FormControl
										error={textFieldsState.ingriedients}
									>
										<TextField
											multiline
											label="Składniki"
											className={classes.field}
											value={dish.ingriedients}
											onChange={handleInput(
												'ingriedients'
											)}
											error={textFieldsState.ingriedients}
										/>
										<FormHelperText>
											{textFieldsState.ingriedients &&
												'Brak składników'}
										</FormHelperText>
									</FormControl>
									<FormControl error={textFieldsState.recipe}>
										<TextField
											multiline
											label="Przepis"
											className={classes.field}
											value={dish.recipe}
											onChange={handleInput('recipe')}
											error={textFieldsState.recipe}
										/>
										<FormHelperText>
											{textFieldsState.recipe &&
												'Brak przepisu'}
										</FormHelperText>
									</FormControl>
								</div>
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
							<Button
								className={classes.submitButton}
								type="submit"
							>
								Dodaj
							</Button>
						</FormControl>
						{alertOpen && (
							<Alert
								variant="filled"
								severity="success"
								className={classes.alert}
							>
								Przepis dodany pomyślnie!
							</Alert>
						)}
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CreateDish;
