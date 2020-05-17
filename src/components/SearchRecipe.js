import React from 'react';
import { InputBase } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		width: 'auto'
	},
	searchIcon: {
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: { color: 'inherit' },
	inputInput: {
		padding: theme.spacing(1, 2, 1, 6),
		transition: theme.transitions.create('width'),
		width: 120,
		'&:focus': {
			width: 200
		}
	}
}));

const SearchRecipe = ({ searchingWord, setSearchingWord }) => {
	const classes = useStyles();
	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				inputProps={{ 'aria-label': 'search' }}
				placeholder="Szukaj przepis..."
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput
				}}
				type="search"
				value={searchingWord}
				onChange={event => setSearchingWord(event.target.value)}
			/>
		</div>
	);
};

export default SearchRecipe;
