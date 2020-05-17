import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { AddCircleRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form';

const useStyles = makeStyles(() => ({
	addButton: {
		marginLeft: '5px'
	},
	addIcon: {
		color: '#e1f5fe'
	}
}));

const CreateRecipe = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	return (
		<>
			<IconButton
				className={classes.addButton}
				onClick={() => setOpen(!open)}
			>
				<AddCircleRounded
					className={classes.addIcon}
					fontSize="large"
				/>
			</IconButton>
			<Form open={open} setOpen={setOpen} />
		</>
	);
};

export default CreateRecipe;
