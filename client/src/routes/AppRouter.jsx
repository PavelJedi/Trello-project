import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

// Private route
import PrivateRoute from "./PrivateRoute";

// Pages
import RegistrationPage from "../views/RegistrationPage/RegistrationPage";
import LoginPage from "../views/LoginPage/LoginPage";
import NotFound from "../views/NotFound/NotFoundPage";

// Components
import Loader from "../components/Loader/Loader";

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); 
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          index
          element={
            isAuthenticated ? (
              <Navigate to="/app" />
            ) : (
              <Navigate to="/registration" />
            )
          }
        />
        <Route path="/app" element={<PrivateRoute />}>
          {/* <Route element={<Layout />}> */}
            {/* <Route index element={<BoardPage />} /> */}
          </Route>
        {/* </Route> */}
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
