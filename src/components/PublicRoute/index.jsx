import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  let token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) => !token
        ? <Component {...props} />
        : <Redirect to="/dashboard" />}
    />
  )
}

export default PrivateRoute;