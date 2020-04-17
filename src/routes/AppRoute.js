import React, { useState, useContext } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Content from '../components/Content';
import DishDetails from '../components/DishDetails';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';
//import PrivateRoute from './PrivateRoute';
//import PublicRoute from './PublicRoute';
import { RecipeContext } from '../components/RecipeProvider';

const AppRoute = () => {
	const [searchingWord, setSearchingWord] = useState('');
	const [searchBar, setSearchBar] = useState(true);
	const [subMenu, setSubMenu] = useState(false);
	const { dishes } = useContext(RecipeContext);
	return (
		<Router>
			<NavBar
				searchingWord={searchingWord}
				setSearchingWord={setSearchingWord}
				searchBar={searchBar}
				subMenu={subMenu}
			/>
			<Switch>
				<Route
					path="/"
					exact
					render={props => {
						setSearchBar(false);
						setSubMenu(false);
						const authToken = JSON.parse(
							localStorage.getItem('authToken')
						);
						return authToken ? (
							<Redirect to="/przepisy" />
						) : (
							<Login {...props} />
						);
					}}
				/>
				<Route
					path="/rejestracja"
					exact
					render={props => {
						setSearchBar(false);
						setSubMenu(false);
						const authToken = JSON.parse(
							localStorage.getItem('authToken')
						);
						return authToken ? (
							<Redirect to="/przepisy" />
						) : (
							<Register {...props} />
						);
					}}
				/>
				<Route
					path="/przepisy"
					exact
					render={props => {
						const authToken = JSON.parse(
							localStorage.getItem('authToken')
						);
						setSearchBar(true);
						setSubMenu(true);
						return authToken ? (
							<Content {...props} searchingWord={searchingWord} />
						) : (
							<Redirect to="/" />
						);
					}}
				/>
				<Route
					path="/przepisy/:id"
					render={props => {
						const dish = dishes.find(
							dish => dish._id == props.match.params.id
						);
						const authToken = JSON.parse(
							localStorage.getItem('authToken')
						);
						if (authToken) {
							setSearchBar(false);
							setSubMenu(true);
							return <DishDetails {...props} dish={dish} />;
						}
						return <Redirect to="/" />;
					}}
				/>
			</Switch>
			<Footer />
		</Router>
	);
};

export default AppRoute;
