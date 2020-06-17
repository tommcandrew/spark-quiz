import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute({ children, ...rest }) {
    const isAuthenticated = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated
          ? children
          : <Redirect
              to={{
                pathname: '/login',
                state: {from: location},
              }}
            />}
    />
  );
}


