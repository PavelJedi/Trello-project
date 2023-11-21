import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../../services/userService";
import { tokenService } from "../../services/tokenService";
import { User, UserState } from "../../interfaces/interfaces";
import { authService } from "../../services/authService";

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = tokenService.getToken();
      if (!accessToken) {
        return rejectWithValue("No access token found");
      }
      const user = await getUser(accessToken);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: tokenService.getToken() ? true : false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state: UserState, action: PayloadAction<User>) => {
          state.currentUser = action.payload;
          state.isAuthenticated = true;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchUser.rejected,
        (state: UserState, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? "An unknown error occurred";
          state.isAuthenticated = false;
          state.isLoading = false;
        }
      );
  },
});

export const { logout, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
