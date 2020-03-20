import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Footer = () => {
	return (
		<Grid item md={12} lg={12}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">© Dawid Wesołowski</Typography>
				</Toolbar>
			</AppBar>
		</Grid>
	);
};

export default Footer;
