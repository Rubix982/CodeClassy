import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Router from "next/router";

const redirectHandler = (__isLoading, __isAuthenticated) => {
  if (!__isAuthenticated && !__isLoading) {
    Router.push("/login");
  }
  return __isAuthenticated && !__isLoading;
};

const EnsureAuthenticated = ({ children, isAuthenticated, isLoading }) => {
  const [shouldRenderChildren, setShouldRenderChildren] = useState(false);

  useEffect(() => {
    setShouldRenderChildren(redirectHandler(isLoading, isAuthenticated));
  }, [isLoading, isAuthenticated]);

  if (shouldRenderChildren) {
    return <>{children}</>;
  }
  return <></>;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, {})(EnsureAuthenticated);
