import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

export default ({ children, ...rest }) => {
  const { userInfo } = useSelector(
    (state) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
