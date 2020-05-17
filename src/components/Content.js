import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import RecipeList from './RecipeList';

const useStyles = makeStyles(theme => ({
	content: {
		minHeight: 'calc(100% - 64px - 75px)',
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 75px - 64px)'
		}
	},
	container: { height: '100%' }
}));

const Content = ({ searchingWord }) => {
	const classes = useStyles();
	return (
		<Grid container className={classes.content} justify="center">
			<Sidebar />
			<RecipeList searchingWord={searchingWord} />
		</Grid>
	);
};

export default Content;
