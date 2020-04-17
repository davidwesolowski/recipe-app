import React, { useContext } from 'react';
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
		height: '100%',
		overflowY: 'auto'
	},
	sidebarGrid: {
		height: '120px',
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
	listItem: {
		padding: '0 16px'
	}
}));

const Products = () => {
	const classes = useStyles();
	const { filters, filtersDispatch } = useContext(RecipeContext);
	const handleCheck = name => event => {
		filtersDispatch(setCategory({ [name]: event.target.checked }));
	};

	return (
		<Grid item xs={12} sm={3} md={2} lg={2} className={classes.sidebarGrid}>
			<Paper className={classes.sidebar}>
				<div className={classes.sidebarHeader}>
					<Typography className={classes.typoHeaderCategory}>
						Kategorie
					</Typography>
					<FaFilter className={classes.filterIcon} />
				</div>
				<List style={{ overflowY: 'auto' }}>
					{Object.keys(filters).length > 0 ? (
						Object.keys(filters).map(product => (
							<ListItem
								classes={{ root: classes.listItem }}
								key={product}
							>
								<FormControlLabel
									control={
										<>
											<Checkbox
												value="secondary"
												color="primary"
												checked={filters[product]}
												onChange={handleCheck(product)}
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
													product
														.charAt(0)
														.toUpperCase() +
													product.substring(
														1,
														product.length
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

export default Products;
