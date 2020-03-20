import React from 'react';
import {
	AppBar,
	IconButton,
	Typography,
	Toolbar,
	Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';
import CreateDish from './CreateDish';
import SearchDish from './SearchDish';

const useStyles = makeStyles(() => ({
	title: { flexGrow: 1, display: 'block' }
}));

const NavBar = ({ searchingWord, setSearchingWord }) => {
	const classes = useStyles();

	return (
		<Grid item md={12} lg={12}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit">
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6">
						CookItSam
					</Typography>
					<SearchDish
						searchingWord={searchingWord}
						setSearchingWord={setSearchingWord}
					/>
					<CreateDish />
				</Toolbar>
			</AppBar>
		</Grid>
	);
};
export default NavBar;
