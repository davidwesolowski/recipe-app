import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppRoute from '../routes/AppRoute';

const useStyles = makeStyles(() => ({
	'@global': {
		'html, body, #root': {
			height: '100%'
		}
	}
}));

const App = () => {
	const classes = useStyles();
	return (
		<CssBaseline>
			<AppRoute styles={classes} />
		</CssBaseline>
	);
};

export default App;
