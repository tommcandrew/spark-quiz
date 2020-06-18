import React from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = localStorage.getItem("token");
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};

export const PublicRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = localStorage.getItem("token");
	return (
		<Route
			{...rest}
			render={(props) => (isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />)}
		/>
	);
};
