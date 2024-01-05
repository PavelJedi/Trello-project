import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import boardReducer from "../slices/boardSlice";
import columnReducer from "../slices/columnSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardReducer,
    columns: columnReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
