import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppRoute from '../routes/AppRoute';
// import dishesReducer from '../reducers/dishesReducer';
// import filtersReducer from '../reducers/filtersReducer';

//import dishesDefault from '../../store';

const useStyles = makeStyles(() => ({
	container: { height: '100%' },
	'@global': {
		'html, body, #root': {
			height: '100%'
		}
	}
}));

const App = () => {
	const classes = useStyles();
	classes.container;
	// const [dishes, dishesDispatch] = useReducer(dishesReducer, []);
	// const [filters, filtersDispatch] = useReducer(filtersReducer, {});

	return (
		<CssBaseline>
			{/* <Grid container className={classes.container}> */}
			<AppRoute />
			{/* </Grid> */}
		</CssBaseline>
	);
};

export default App;
