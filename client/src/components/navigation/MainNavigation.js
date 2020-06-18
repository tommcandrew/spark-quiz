import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import { ProtectedRoute, PublicRoute } from "./Routes";

import Dashboard from "../../screens/userScreens/Dashboard";
import Home from "../../screens/authenticationScreens/Home";
import Login from "../../screens/authenticationScreens/Login";
import Register from "../../screens/authenticationScreens/Register";

const MainNavigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute exact={true} path="/" component={Home} />
				<PublicRoute exact={true} path="/login" component={Login} />
				<PublicRoute exact={true} path="/register" component={Register} />
				<ProtectedRoute path="/dashboard" component={Dashboard} />
			</Switch>
		</BrowserRouter>
	);
};

export default MainNavigation;
