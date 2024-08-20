import { createSlice } from "@reduxjs/toolkit";
import { loginAsync } from "./authAsyncActions";

// Retrieve stored user data from localStorage
const storedUser = localStorage.getItem("user");
const initialState = {
  isLoggedIn: !!storedUser,
  user: storedUser ? JSON.parse(storedUser) : null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      // Remove user data from localStorage
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.status = "succeeded";
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
