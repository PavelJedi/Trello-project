import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Private route
import PrivateRoute from "./PrivateRoute";

// Pages
import RegistrationPage from "../views/RegistrationPage/RegistrationPage";
import LoginPage from "../views/LoginPage/LoginPage";
import HomePage from "../views/HomePage/Board";
import ColumnPage from "../views/ColumnPage/ColumnPage";
import NotFound from "../views/NotFound/NotFoundPage";

// Components
import Loader from "../components/Loader/Loader";
import Navbar from "../components/layout/Navbar/Navbar";

// Redux state
import { RootState } from "../redux/store/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const AppRouter = () => {
  const isAuthenticated = useTypedSelector(
    (state) => state.user.isAuthenticated
  );
  return (
    <Suspense fallback={<Loader isAuthPage={false} />}>
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
          <Route element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="list/:boardId" element={<ColumnPage />} />
          </Route>
        </Route>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
