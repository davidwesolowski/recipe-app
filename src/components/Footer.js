import React from 'react';
import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
	footer: {
		display: 'flex',
		justifyContent: 'center'
	},
	footerIcon: {
		color: '#fff',
		margin: '0 10px',
		width: '1.2rem',
		height: '1.2rem'
	}
}));

const Footer = () => {
	const classes = useStyles();
	return (
		<Grid item md={12} lg={12}>
			<AppBar position="static">
				<Toolbar className={classes.footer}>
					<Typography variant="h6">© Dawid Wesołowski</Typography>
					<a
						href="https://github.com/davidwesolowski"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub className={classes.footerIcon} />
					</a>
					<a
						href="https://www.linkedin.com/in/dawid-weso%C5%82owski/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaLinkedin className={classes.footerIcon} />
					</a>
				</Toolbar>
			</AppBar>
		</Grid>
	);
};

export default Footer;
