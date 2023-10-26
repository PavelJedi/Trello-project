import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTypedSelector } from "./AppRouter";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useTypedSelector((state) => state.user);

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
