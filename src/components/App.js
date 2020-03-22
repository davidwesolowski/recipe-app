import React, { useState, useReducer, useCallback, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Content from './Content';
import DishDetails from './DishDetails';
import Footer from './Footer';
import dishesReducer from '../reducers/dishesReducer';
import filtersReducer from '../reducers/filtersReducer';
import dishesDefault from '../../store';

const useStyles = makeStyles(() => ({
	container: { height: '100%' },
	content: { height: 'calc(100% - 64px - 64px)' },
	'@global': {
		'html, body, #root': {
			height: '100%'
		}
	}
}));

export const ContentContext = createContext();

const App = () => {
	const classes = useStyles();
	const [searchingWord, setSearchingWord] = useState('');

	const [dishes, dishesDispatch] = useReducer(dishesReducer, dishesDefault);
	const filtersDefault = useCallback(
		dishes.reduce(
			(prev, curr) => ({
				...prev,
				[curr.kind]: false
			}),
			{}
		),
		[dishes]
	);
	const [filters, filtersDispatch] = useReducer(
		filtersReducer,
		filtersDefault
	);

	return (
		<>
			<CssBaseline>
				<ContentContext.Provider
					value={{ dishes, dishesDispatch, filters, filtersDispatch }}
				>
					<Grid container className={classes.container}>
						<Router>
							<NavBar
								searchingWord={searchingWord}
								setSearchingWord={setSearchingWord}
							/>
							<Switch>
								<Route
									path="/"
									exact
									render={props => (
										<Content
											{...props}
											searchingWord={searchingWord}
											classes={classes}
										/>
									)}
								/>
								<Route
									path="/:id"
									render={props => {
										const dish = dishes.find(
											dish =>
												dish.id ===
												+props.match.params.id
										);
										return (
											<DishDetails
												{...props}
												dish={dish}
											/>
										);
									}}
								/>
							</Switch>
							<Footer />
						</Router>
					</Grid>
				</ContentContext.Provider>
			</CssBaseline>
		</>
	);
};

export default App;
