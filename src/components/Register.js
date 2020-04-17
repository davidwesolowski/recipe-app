import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	Paper,
	TextField,
	FormControl,
	FormHelperText,
	Button,
	Typography,
	Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import validateRegister from '../validation/validateRegister';

const useStyles = makeStyles(theme => ({
	contentGrid: {
		minHeight: 'calc(100% - 64px - 64px)',
		minWidth: '100vw'
	},
	contentForm: {
		minHeight: 'calc(100vh - 64px - 64px)',
		minWidth: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.up('md')]: {
			minWidth: '90%'
		}
	},
	formBox: {
		boxShadow: '1px 1px 6px 2px #071d80',
		minWidth: '100%',
		minHeight: '100%',
		[theme.breakpoints.up('sm')]: {
			minWidth: '65%',
			minHeight: '45%'
		},
		[theme.breakpoints.up('md')]: {
			minWidth: '45%',
			minHeight: '45%'
		}
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		padding: 10
	},
	submitButton: {
		backgroundColor: '#2196f3',
		color: 'white',
		'&:hover': {
			backgroundColor: '#3f51b5'
		},
		fontFamily: 'Frank Ruhl Libre, serif',
		fontWeight: '500',
		fontSize: '1.1rem'
	},
	formTextField: {
		marginBottom: 15,
		padding: 5
	},
	formHeader: {
		fontFamily: 'Frank Ruhl Libre, serif',
		fontWeight: '500',
		fontSize: '1.2rem',
		textAlign: 'center',
		borderBottom: '1px solid #eee'
	},
	registerBox: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: 7
	},
	registerLink: {
		textDecoration: 'none',
		'& > p': {
			fontFamily: 'Frank Ruhl Libre, serif',
			fontWeight: '400',
			fontSize: '1rem'
		},
		'&:active': {
			color: '#283593'
		}
	}
}));

const Register = ({ history: { push } }) => {
	const classes = useStyles();
	const defaultFormData = {
		name: '',
		email: '',
		password: '',
		repPassword: ''
	};
	const defaultFormDataState = {
		name: false,
		email: false,
		password: false,
		repPassword: false
	};
	const defaultErrorMesssages = {
		name: '',
		email: '',
		password: '',
		repPassword: 'Wprowadź hasło ponownie!',
		diffPassword: 'Hasła muszą być takie same!'
	};
	const [formData, setFormData] = useState(defaultFormData);
	const [formDataState, setFormDataState] = useState(defaultFormDataState);
	const [errorMessages, setErrorMessages] = useState(defaultErrorMesssages);

	const registerUser = async user => {
		try {
			const {
				data: { error }
			} = await axios.post('http://localhost:3000/signUp', user);
			if (!error) {
				setFormData(defaultFormData);
				push('/');
				return;
			}
			setErrorMessages(prev => ({
				...prev,
				createError: error
			}));
			const errorFormDataState = Object.keys(formDataState).reduce(
				(acc, curr) => ({
					...acc,
					[curr]: true
				}),
				{}
			);
			setFormDataState(errorFormDataState);
		} catch (e) {
			throw new Error('Error in registering user');
		}
	};

	const handleInput = name => event => {
		event.persist();
		setFormData(prev => ({
			...prev,
			[name]: event.target.value
		}));
	};

	const handleSubmit = event => {
		event.preventDefault();
		const formState = Object.keys(defaultFormData).reduce(
			(acc, curr) => ({
				...acc,
				[curr]: !formData[curr]
			}),
			{ diffPassword: false }
		);

		const { error } = validateRegister(formData);
		if (!error) {
			registerUser(formData);
		} else {
			const errorMessage = error.details.reduce((acc, curr) => {
				const type = curr.path[0];
				const msg = curr.message;
				formState[type] = true;
				return {
					...acc,
					[type]: msg
				};
			}, {});
			const { password, repPassword } = formData;
			if (password !== repPassword) {
				setFormDataState(prev => ({
					...prev,
					diffPassword: true
				}));
			}
			setFormDataState(formState);
			setErrorMessages(prev => ({
				...prev,
				...errorMessage
			}));
		}
	};

	return (
		<Grid container justify="center" className={classes.contentGrid}>
			<Paper className={classes.contentForm}>
				<div className={classes.formBox}>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Typography className={classes.formHeader}>
							Załóż konto
						</Typography>
						<FormControl className={classes.formTextField}>
							<TextField
								label="Nazwa"
								value={formData.name}
								onChange={handleInput('name')}
								error={formDataState.name}
							/>
							<FormHelperText>
								{formDataState.name && errorMessages.name}
							</FormHelperText>
						</FormControl>
						<FormControl className={classes.formTextField}>
							<TextField
								label="E-mail"
								value={formData.email}
								onChange={handleInput('email')}
								error={formDataState.email}
							/>
							<FormHelperText>
								{formDataState.email && errorMessages.email}
							</FormHelperText>
						</FormControl>
						<FormControl className={classes.formTextField}>
							<TextField
								label="Hasło"
								type="password"
								value={formData.password}
								onChange={handleInput('password')}
								autoComplete="new-password"
								error={
									formDataState.password ||
									formDataState.diffPassword
								}
							/>
							<FormHelperText>
								{formDataState.password &&
									errorMessages.password}
							</FormHelperText>
						</FormControl>
						<FormControl className={classes.formTextField}>
							<TextField
								label="Potwierdź hasło"
								type="password"
								value={formData.repPassword}
								onChange={handleInput('repPassword')}
								error={
									formDataState.repPassword ||
									formDataState.diffPassword
								}
								autoComplete="new-password"
							/>
							<FormHelperText>
								{!errorMessages.createError &&
									formDataState.repPassword &&
									errorMessages.repPassword}
							</FormHelperText>
							<FormHelperText>
								{formDataState.diffPassword &&
									errorMessages.diffPassword}
							</FormHelperText>
						</FormControl>
						<Button
							variant="outlined"
							type="submit"
							className={classes.submitButton}
						>
							Utwórz
						</Button>
						<div className={classes.registerBox}>
							<Link to="/" className={classes.registerLink}>
								<Typography>Zaloguj się</Typography>
							</Link>
						</div>
						<FormHelperText>
							{errorMessages.createError &&
								errorMessages.createError}
						</FormHelperText>
					</form>
				</div>
			</Paper>
		</Grid>
	);
};

export default Register;
