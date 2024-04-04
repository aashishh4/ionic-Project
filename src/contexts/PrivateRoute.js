import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth1 } from './AuthContext';

const  PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth1();
  // console.log("isAuthenticated1",isAuthenticated)

  return (
    <Route
      {...rest}
      render={(props) =>
       
          isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default PrivateRoute;