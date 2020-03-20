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
import { ContentContext } from './App';
import { setFilterAction } from '../actions/filterAction';

const useStyles = makeStyles(() => ({
	sidebar: {
		height: '100%',
		overflowY: 'auto'
	},
	sidebar__header: {
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
	filterIcon: {
		marginTop: '.5rem',
		height: '1.5rem',
		width: '1.5rem'
	}
}));

const Products = () => {
	const classes = useStyles();
	const { filters, filtersDispatch } = useContext(ContentContext);
	const handleCheck = name => event => {
		filtersDispatch(setFilterAction({ [name]: event.target.checked }));
	};
	return (
		<Grid item md={2} lg={2}>
			<Paper className={classes.sidebar}>
				<div className={classes.sidebar__header}>
					<Typography className={classes.typoHeaderCategory}>
						Kategorie
					</Typography>
					<FaFilter className={classes.filterIcon} />
				</div>
				<List style={{ overflowY: 'auto' }}>
					{Object.keys(filters).map(product => (
						<ListItem key={product}>
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
												primary: classes.typoCategory
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
					))}
				</List>
			</Paper>
		</Grid>
	);
};

export default Products;
