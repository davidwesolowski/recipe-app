import React, { useContext, useState } from 'react';
import {
	Grid,
	Paper,
	Typography,
	List,
	ListItem,
	Checkbox,
	FormControlLabel,
	ListItemText
} from '@material-ui/core';
import { FaFilter } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import { RecipeContext } from './RecipeProvider';
import { setCategory } from '../actions/categoryAction';

const useStyles = makeStyles(theme => ({
	sidebar: {
		[theme.breakpoints.up('sm')]: {
			minHeight: '100%'
		}
	},
	sidebarGrid: {
		minHeight: '60px',
		maxHeight: '160px',
		[theme.breakpoints.up('sm')]: {
			minHeight: '100%'
		}
	},
	sidebarHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '10px',
		borderBottom: '1px solid #eee'
	},
	typoHeaderCategory: {
		fontFamily: 'Oswald, sans-serif',
		fontWeight: '500',
		fontSize: '1.5rem'
	},
	typoCategory: {
		fontFamily: 'Oswald, sans-serif',
		fontWeight: '400',
		fontSize: '1.2rem'
	},
	noCategory: {
		fontFamily: 'Oswald, sans-serif',
		fontWeight: '400',
		fontSize: '1.3rem',
		textAlign: 'center'
	},
	filterIcon: {
		marginTop: '.5rem',
		height: '1.5rem',
		width: '1.5rem'
	},
	sidebarList: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			overflowY: 'auto',
			display: 'block',
			margin: 0
		}
	},
	sidebarDropdown: {
		display: 'flex',
		flexFlow: 'row wrap',
		alignItems: 'center',
		overflowY: 'hidden',
		marginLeft: 5,
		[theme.breakpoints.up('sm')]: {
			overflowY: 'auto',
			display: 'block',
			margin: 0
		}
	},
	listItem: {
		padding: '0 5px',
		flexBasis: 0,
		[theme.breakpoints.up('sm')]: {
			padding: '0 16px'
		}
	}
}));

const Sidebar = () => {
	const classes = useStyles();
	const { filters, filtersDispatch } = useContext(RecipeContext);
	const [dropdown, setDropdown] = useState(false);
	const handleCheck = name => event => {
		filtersDispatch(setCategory({ [name]: event.target.checked }));
	};

	return (
		<Grid item xs={12} sm={3} md={2} lg={2} className={classes.sidebarGrid}>
			<Paper className={classes.sidebar}>
				<div
					className={classes.sidebarHeader}
					role={dropdown ? 'button' : ''}
					onClick={() => setDropdown(!dropdown)}
					onKeyDown={() => setDropdown(!dropdown)}
				>
					<Typography className={classes.typoHeaderCategory}>
						Kategorie
					</Typography>
					<FaFilter className={classes.filterIcon} />
				</div>
				<List
					className={
						dropdown ? classes.sidebarDropdown : classes.sidebarList
					}
				>
					{Object.keys(filters).length > 0 ? (
						Object.keys(filters).map(category => (
							<ListItem
								key={category}
								classes={{ root: classes.listItem }}
							>
								<FormControlLabel
									control={
										<>
											<Checkbox
												value="secondary"
												color="primary"
												checked={filters[category]}
												onChange={handleCheck(category)}
												inputProps={{
													'aria-label':
														'secondary checkbox'
												}}
											/>
											<ListItemText
												classes={{
													primary:
														classes.typoCategory
												}}
												primary={
													category
														.charAt(0)
														.toUpperCase() +
													category.substring(
														1,
														category.length
													)
												}
											/>
										</>
									}
								/>
							</ListItem>
						))
					) : (
						<div className={classes.noCategory}>
							Tutaj pojawi się kategoria po dodaniu przepisu.{' '}
							<span role="img" aria-label="smile">
								😉
							</span>
						</div>
					)}
				</List>
			</Paper>
		</Grid>
	);
};

export default Sidebar;
