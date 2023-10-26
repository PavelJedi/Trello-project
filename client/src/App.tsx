import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { fetchUser } from "./redux/slices/userSlice";
import { AppDispatch } from "./redux/store/store";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return <AppRouter />;
};

export default App;
