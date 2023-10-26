import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../services/userService";
import { User } from "../../interfaces/interfaces";

interface UserState {
  currentUser: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any;
}

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const user = await getUser();
        return { user, isAuthenticated: true };
      }
      return { user: {} as User, isAuthenticated: false };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: { id: 0, name: "" },
    isAuthenticated: !!localStorage.getItem("token"),
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
