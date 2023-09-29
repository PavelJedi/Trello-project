import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
