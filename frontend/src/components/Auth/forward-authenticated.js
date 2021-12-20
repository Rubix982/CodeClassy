import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Router from "next/router";

const redirectHandler = (__isLoading, __isAuthenticated, __redirectUrl) => {
  if (__isAuthenticated && !__isLoading) {
    Router.push(__redirectUrl);
  }
  return !__isAuthenticated && !__isLoading;
};

const ForwardAuthenticated = ({ children, isAuthenticated, isLoading }) => {
  const [shouldRenderChildren, setShouldRenderChildren] = useState(false);

  useEffect(() => {
    setShouldRenderChildren(redirectHandler(isLoading, isAuthenticated, "/h"));
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

export default connect(mapStateToProps, {})(ForwardAuthenticated);
