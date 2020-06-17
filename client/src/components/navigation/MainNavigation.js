import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import Dashboard from '../../screens/userScreens/Dashboard';
import Home from '../../screens/authenticationScreens/Home';
import Login from '../../screens/authenticationScreens/Login';
import Register from '../../screens/authenticationScreens/Register';

const MainNavigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Register} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />

      </Switch>
    </BrowserRouter>
  );
};

export default MainNavigation;
