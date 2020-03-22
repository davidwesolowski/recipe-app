import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HomeRounded } from '@material-ui/icons';
import Dish from './Dish';
import { ContentContext } from './App';

const useStyles = makeStyles(() => ({
	contentDetails: {
		height: '100%',
		width: '90%'
	},
	containerDetails: {
		height: 'calc(100% - 64px - 64px)',
		display: 'flex',
		justifyContent: 'center',
		overflowY: 'auto',
		boxSizing: 'border-box'
	},
	dishImgContainer: {
		height: 250,
		padding: 10
	},
	dishImg: {
		height: '100%',
		width: '100%',
		borderRadius: '10%',
		objectFit: 'cover',
		objectPosition: 'center 40%'
	},
	dishHeader: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center'
	},
	dishName: {
		fontFamily: 'Oswald, sans-serif',
		fontWeight: '500',
		fontSize: '2rem',
		letterSpacing: 1
	},
	homeLink: {
		position: 'absolute',
		left: 2,
		top: 2
	},
	homeIcon: {
		height: '2rem',
		width: '2rem',
		transition: 'all .5s ease',
		'&:hover': {
			height: '2.2rem',
			width: '2.2rem'
		},
		'&:active': {
			color: '#283593'
		}
	},
	ingriedientsContainer: {
		diplay: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '0 10px'
	},
	title: {
		fontFamily: 'Oswald, sans-serif',
		fontWeight: '500',
		fontSize: '1.5rem'
	},
	centerStyleContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 10
	},
	description: {
		fontFamily: 'Frank Ruhl Libre, serif',
		fontWeight: '400',
		fontSize: '1.2rem'
	}
}));

const DishDetails = ({ dish }) => {
	const classes = useStyles();
	const { dishes } = useContext(ContentContext);
	return (
		<Grid
			item
			container
			md={12}
			lg={12}
			className={classes.containerDetails}
		>
			<Paper className={classes.contentDetails}>
				<div className={classes.dishHeader}>
					<Typography className={classes.dishName}>
						{dish.name}
					</Typography>
					<Link to="/" className={classes.homeLink}>
						<HomeRounded className={classes.homeIcon} />
					</Link>
				</div>
				<Grid container>
					<Grid item md={3} lg={3}>
						<div className={classes.dishImgContainer}>
							<img
								src={dish.img ? dish.img : '/img/loader.gif'}
								alt={`Przepis: ${dish.name}`}
								className={classes.dishImg}
							/>
						</div>
						<div className={classes.ingriedientsContainer}>
							<Typography className={classes.title}>
								Składniki:
							</Typography>
							<Typography className={classes.description}>
								Cos
							</Typography>
						</div>
					</Grid>
					<Grid item md={6} lg={6}>
						<div className={classes.centerStyleContainer}>
							<Typography className={classes.title}>
								Przepis:
							</Typography>
							<Typography className={classes.description}>
								{dish.recipe}
							</Typography>
						</div>
					</Grid>
					<Grid item md={3} lg={3}>
						<div className={classes.centerStyleContainer}>
							<Typography className={classes.title}>
								Inne przepisy:
							</Typography>
							{dishes
								.filter(
									dishElement =>
										dishElement.kind === dish.kind &&
										dishElement.name !== dish.name
								)
								.map(dishElement => (
									<Dish
										key={dishElement.id}
										dish={dishElement}
									/>
								))}
						</div>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default DishDetails;
