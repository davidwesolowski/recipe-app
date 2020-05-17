import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateRecipe from './CreateRecipe';
import SearchRecipe from './SearchRecipe';
import SubMenu from './SubMenu';

const useStyles = makeStyles(theme => ({
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	logo: {
		display: 'flex',
		alignItems: 'center',
		textDecoration: 'none',
		color: '#fff',
		flexGrow: 1
	},
	logoImg: {
		//position: 'absolute',
		objectFit: 'center',
		objectPosition: 'center 40%',
		width: '75px',
		height: '75px'
	}
}));

const NavBar = ({ searchingWord, setSearchingWord, searchBar, subMenu }) => {
	const classes = useStyles();
	let Component;
	if (searchBar && subMenu) {
		Component = (
			<>
				<SearchRecipe
					searchingWord={searchingWord}
					setSearchingWord={setSearchingWord}
				/>
				<CreateRecipe />
				<SubMenu />
			</>
		);
	} else if (!searchBar && subMenu) {
		Component = (
			<>
				<CreateRecipe />
				<SubMenu />
			</>
		);
	} else {
		Component = <></>;
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Link to="/przepisy" className={classes.logo}>
					<img
						src="/img/logo.png"
						alt="logo"
						className={classes.logoImg}
					/>
					<Typography variant="h6" className={classes.title}>
						CookItSam
					</Typography>
				</Link>
				{Component}
			</Toolbar>
		</AppBar>
	);
};
export default NavBar;
