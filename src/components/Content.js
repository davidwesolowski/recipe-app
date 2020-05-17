import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import DishList from './DishList';

const useStyles = makeStyles(theme => ({
	content: {
		minHeight: 'calc(100% - 64px)',
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 75px - 64px)'
		}
	},
	container: { height: '100%' }
}));

const Content = ({ searchingWord }) => {
	const classes = useStyles();
	return (
		// <Grid item xs={12} md={12} lg={12} className={classes.content}>
		// 	<Grid container justify="center" className={classes.container}>
		// 		<Sidebar />
		// 		<DishList searchingWord={searchingWord} />
		// 	</Grid>
		// </Grid>
		<Grid container className={classes.content} justify="center">
			<Sidebar />
			<DishList searchingWord={searchingWord} />
		</Grid>
	);
};

export default Content;
