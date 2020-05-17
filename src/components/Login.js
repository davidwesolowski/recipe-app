import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	Paper,
	TextField,
	FormControl,
	FormHelperText,
	Button,
	Grid,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import validateLogin from '../validation/validateLogin';

const useStyles = makeStyles(theme => ({
	contentGrid: {
		minHeight: 'calc(100% - 75px - 64px)',
		width: '100vw',
		boxSizing: 'border-box'
	},
	contentForm: {
		minHeight: 'calc(100vh - 75px - 64px)',
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
			minWidth: '55%',
			minHeight: '55%'
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
	},
	alert: {
		marginTop: 5
	}
}));

const Login = ({ history: { push } }) => {
	const classes = useStyles();
	const defaultFormData = {
		email: '',
		password: ''
	};
	const defaultFormDataState = {
		email: false,
		password: false
	};
	const defaultErrorMessages = {
		email: '',
		password: ''
	};
	const [formData, setFormData] = useState(defaultFormData);
	const [formDataState, setFormDataState] = useState(defaultFormDataState);
	const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
	const [alertOpen, setAlertOpen] = useState(false);

	const loginUser = async user => {
		try {
			const {
				data: { token, error }
			} = await axios.post('http://localhost:3000/login', user);
			if (!error) {
				if (localStorage.getItem('authToken'))
					localStorage.removeItem('authToken');
				const authToken = token.split(' ')[1];
				localStorage.setItem('authToken', JSON.stringify(authToken));
				setAlertOpen(true);
				setErrorMessages(prev => ({ ...prev, loginError: '' }));
				setTimeout(() => {
					setAlertOpen(false);
					push('/przepisy');
				}, 1000);
				return;
			}
			setAlertOpen(true);
			setFormDataState({ email: true, password: true });
			setErrorMessages(prev => ({
				...prev,
				loginError: error
			}));
		} catch (e) {
			throw new Error('Error in login user');
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
		const { error } = validateLogin(formData);
		if (!error) {
			loginUser(formData);
		} else {
			const formState = Object.keys(defaultFormData).reduce(
				(acc, curr) => ({
					...acc,
					[curr]: !formData[curr]
				}),
				{}
			);
			const errorMessage = error.details.reduce((acc, curr) => {
				const type = curr.path[0];
				const msg = curr.message;
				formState[type] = true;
				return {
					...acc,
					[type]: msg
				};
			}, {});
			setFormDataState(formState);
			setErrorMessages(errorMessage);
		}
	};

	return (
		<Grid container justify="center" className={classes.contentGrid}>
			<Paper className={classes.contentForm}>
				<div className={classes.formBox}>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Typography className={classes.formHeader}>
							Zaloguj się
						</Typography>
						<FormControl className={classes.formTextField}>
							<TextField
								label="E-mail"
								value={formData.email}
								onChange={handleInput('email')}
								error={formDataState.email}
								autoComplete="username"
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
								error={formDataState.password}
							/>
							<FormHelperText>
								{formDataState.password &&
									errorMessages.password}
							</FormHelperText>
						</FormControl>
						<Button
							variant="outlined"
							type="submit"
							className={classes.submitButton}
						>
							Zaloguj się
						</Button>
						{alertOpen ? (
							<Alert
								variant="filled"
								severity={
									errorMessages.loginError
										? 'error'
										: 'success'
								}
								className={classes.alert}
							>
								{errorMessages.loginError
									? errorMessages.loginError
									: 'Pomyślne logowanie!'}
							</Alert>
						) : (
							<div className={classes.registerBox}>
								<Link
									to="/rejestracja"
									className={classes.registerLink}
								>
									<Typography>Nie masz konta?</Typography>
								</Link>
							</div>
						)}
					</form>
				</div>
			</Paper>
		</Grid>
	);
};

export default Login;
