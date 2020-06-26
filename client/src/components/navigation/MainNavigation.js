import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { ProtectedRoute, PublicRoute, StudentRoute } from "./Routes";

import Dashboard from "../../screens/userScreens/Dashboard";
import Home from "../../screens/authenticationScreens/Home";
import Login from "../../screens/authenticationScreens/Login";
import ForgotPassword from "../../screens/authenticationScreens/ForgotPassword";
import Register from "../../screens/authenticationScreens/Register";
import Quiz from "../../screens/studentScreens/Quiz";

const MainNavigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact={true} path="/" component={Home} />
        <PublicRoute exact={true} path="/login" component={Login} />
        <PublicRoute exact={true} path="/register" component={Register} />
        <PublicRoute
          exact={true}
          path="/forgotPassword"
          component={ForgotPassword}
        />

        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <StudentRoute path="/quiz" component={Quiz} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainNavigation;
