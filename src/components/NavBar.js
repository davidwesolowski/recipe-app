import React from 'react';
import { Link } from 'react-router-dom';
//import classNames from 'classnames';
import {
	AppBar,
	//IconButton,
	Typography,
	Toolbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import { Menu as MenuIcon } from '@material-ui/icons';
import CreateDish from './CreateDish';
import SearchDish from './SearchDish';
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
				<SearchDish
					searchingWord={searchingWord}
					setSearchingWord={setSearchingWord}
				/>
				<CreateDish />
				<SubMenu />
			</>
		);
	} else if (!searchBar && subMenu) {
		Component = (
			<>
				<CreateDish />
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
