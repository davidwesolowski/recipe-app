import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			const authToken = JSON.parse(localStorage.getItem('authToken'));
			return authToken ? <Component {...props} /> : <Redirect to="/" />;
		}}
	/>
);

export default PrivateRoute;
