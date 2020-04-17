import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(() => ({
	menuItem: {
		borderBottom: '1px solid #eee'
	},
	linkItem: {
		textDecoration: 'none',
		'&:active': {
			color: '#283593'
		}
	}
}));

const SubMenu = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleLogOut = () => {
		setAnchorEl(null);
		localStorage.removeItem('authToken');
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton onClick={handleClick} color="inherit">
				<MoreVertIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<Link to="/" className={classes.linkItem}>
					<MenuItem
						className={classes.menuItem}
						onClick={handleClose}
					>
						Konto
					</MenuItem>
				</Link>
				<Link to="/" className={classes.linkItem}>
					<MenuItem onClick={handleLogOut}>Wyloguj się</MenuItem>
				</Link>
			</Menu>
		</>
	);
};

export default SubMenu;
