import { createSlice } from "@reduxjs/toolkit";
import { POST } from "../../services/api";

// Retrieve stored user data from localStorage
const storedUser = localStorage.getItem("user");
const token = localStorage.getItem("token");
const initialState = {
  isLoggedIn: !!storedUser,
  user: storedUser ? JSON.parse(storedUser) : null,
  status: "idle",
  error: null,
  token: token,
};

const loginUrl = process.env.REACT_APP_BASE_URL + "/login";
console.log(loginUrl);

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(POST("userLogin", loginUrl).pending, (state) => {
        state.status = "loading";
      })
      .addCase(POST("userLogin", loginUrl).fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.isLoggedIn = true;
        state.token = token || ""; // Use a default value if token is undefined
        state.user = user ? { username: user.name } : null;
        state.status = "succeeded";
        localStorage.setItem("user", JSON.stringify({ username: user.name }));
        localStorage.setItem("token", token || "");
        console.log(state.token);
      })
      .addCase(POST("userLogin", loginUrl).rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.status = "failed";
        state.error = action.payload || "Login failed";
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  },
});

export default AuthSlice.reducer;
