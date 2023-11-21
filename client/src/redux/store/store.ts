import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import boardReducer from "../slices/boardSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
