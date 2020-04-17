import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ render: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			const authToken = JSON.parse(localStorage.getItem('authToken'));
			return authToken ? (
				<Redirect to="/przepisy" />
			) : (
				<Component {...props} />
			);
		}}
	/>
);

export default PublicRoute;
