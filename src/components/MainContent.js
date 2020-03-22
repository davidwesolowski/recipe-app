import React, { useContext } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ContentContext } from './App';
import Dish from './Dish';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		width: '100%',
		flexFlow: 'row wrap',
		padding: '10px 5px'
	},
	container: {
		height: '100%',
		overflowY: 'auto'
	}
}));

const MainContent = ({ searchingWord }) => {
	const classes = useStyles();
	const { dishes, filters } = useContext(ContentContext);
	const filterValues = Object.values(filters).every(value => value === false);
	return (
		<Grid item md={9} lg={9}>
			<Paper className={classes.container}>
				<div className={classes.root}>
					{dishes.length !== 0 ? (
						filterValues === true ? (
							dishes
								.filter(dish =>
									dish.name.includes(
										searchingWord.toUpperCase()
									)
								)
								.map(dish => <Dish key={dish.id} dish={dish} />)
						) : (
							dishes
								.filter(dish => {
									if (
										dish.kind in filters &&
										filters[dish.kind] &&
										dish.name.includes(
											searchingWord.toUpperCase()
										)
									)
										return true;
									return false;
								})
								.map(dish => <Dish key={dish.id} dish={dish} />)
						)
					) : (
						<h1>No dishes found!</h1>
					)}
				</div>
			</Paper>
		</Grid>
	);
};

export default MainContent;
