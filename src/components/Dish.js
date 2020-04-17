import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	recipeGrid: {
		margin: '5px 0',
		display: 'flex',
		justifyContent: 'center'
	},
	imageLink: {
		position: 'relative',
		height: 200,
		width: '80%',
		[theme.breakpoints.up('sm')]: {
			width: '90%'
		}
	},
	image: {
		position: 'relative',
		width: '100%',
		height: 200, //100%
		'&:hover, &$focusVisible': {
			zIndex: 1,
			'& $imageMarked': {
				opacity: 0
			},
			'& $imageBackdrop': {
				opacity: 0.1
			},
			'& $imageTitle': {
				border: `3px solid ${theme.palette.common.white}`
			}
		}
	},
	focusVisible: {},
	imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center 40%',
		borderRadius: '10%',
		height: '100%',
		widht: '100%'
	},
	imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.3,
		transition: theme.transitions.create('opacity'),
		borderRadius: '10%'
	},
	imageTitle: {
		position: 'relative',
		padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(
			1
		)}px`
	},
	imageMarked: {
		height: 3,
		width: 30,
		backgroundColor: theme.palette.common.white,
		position: 'absolute',
		bottom: -2,
		left: 'calc(50% - 9px)',
		transition: theme.transitions.create('opacity')
	}
}));

const Dish = ({ dish }) => {
	const classes = useStyles();
	const { name, img, _id } = dish;
	return (
		<Grid item xs={12} sm={4} md={3} className={classes.recipeGrid}>
			<Link to={`/przepisy/${_id}`} className={classes.imageLink}>
				<ButtonBase
					focusRipple
					className={classes.image}
					focusVisibleClassName={classes.focusVisible}
				>
					<span
						className={classes.imageSrc}
						style={{ backgroundImage: `url(${img})` }}
					/>
					<span className={classes.imageBackdrop} />
					<span className={classes.imageButton}>
						<Typography
							component="span"
							variant="subtitle1"
							color="inherit"
							className={classes.imageTitle}
						>
							{name}
							<span className={classes.imageMarked} />
						</Typography>
					</span>
				</ButtonBase>
			</Link>
		</Grid>
	);
};

export default Dish;
