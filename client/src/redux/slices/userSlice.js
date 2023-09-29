import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../services/userService";

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const { data } = await getUser(accessToken);
        return { user: data, isAuthenticated: true };
      }
      return { user: {}, isAuthenticated: false };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isLoading: true,
    isAuthenticated: !!localStorage.getItem("token"),
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isLoading = false;
    },
    [fetchUser.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
