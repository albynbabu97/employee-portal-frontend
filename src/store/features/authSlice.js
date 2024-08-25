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
  registerStatus: false,
  registerError: null,
};

const loginUrl = process.env.REACT_APP_BASE_URL + "/login";
const registerUrl = process.env.REACT_APP_BASE_URL + "/register";
const logoutUrl = process.env.REACT_APP_BASE_URL + "/logout";

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setRegisterFormClose: (state) => {
      console.log("closed");
      state.registerStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(POST("userLogin", loginUrl).pending, (state) => {
        state.status = "loading";
      })
      .addCase(POST("userLogin", loginUrl).fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.isLoggedIn = true;
        state.token = token || "";
        state.user = user ? { username: user.name } : null;
        state.status = "succeeded";
        localStorage.setItem("user", JSON.stringify({ username: user.name }));
        localStorage.setItem("token", token || "");
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

    builder
      .addCase(POST("userRegister", registerUrl).pending, (state) => {
        state.status = "loading";
        state.registerStatus = false;
        state.registerError = null;
      })
      .addCase(POST("userRegister", registerUrl).fulfilled, (state, action) => {
        if (action.payload?.status) state.registerStatus = true;
        // else state.registerError = action.payload?.errors;
        else
          state.registerError = [
            "Registration unsuccessful. Please correct the mistake and retry.",
          ];
      })
      .addCase(POST("userRegister", registerUrl).rejected, (state, action) => {
        console.log(action.payload);
        state.registerStatus = false;
        state.registerError = null;
      });

    builder
      .addCase(POST("userLogout", logoutUrl).pending, (state) => {
        state.status = "loading";
      })
      .addCase(POST("userLogout", logoutUrl).fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.token = "";
        state.user = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .addCase(POST("userLogout", logoutUrl).rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default AuthSlice.reducer;
export const { setRegisterFormClose } = AuthSlice.actions;
