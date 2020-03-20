import React from 'react';
import { Grid } from '@material-ui/core';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Content = ({ classes, searchingWord }) => {
	return (
		<Grid item md={12} lg={12} className={classes.content}>
			<Grid container justify="center" className={classes.container}>
				<Sidebar />
				<MainContent searchingWord={searchingWord} />
			</Grid>
		</Grid>
	);
};

export default Content;
