import React from 'react';
import { Link } from 'react-router-dom';
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
	title: {
		flexGrow: 1,
		display: 'block',
		textDecoration: 'none',
		color: '#fff'
	}
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
					<Link to="/" className={classes.title}>
						<Typography variant="h6">CookItSam</Typography>
					</Link>
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
