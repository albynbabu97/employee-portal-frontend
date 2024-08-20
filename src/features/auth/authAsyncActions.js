import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    // Simulate an API call
    // Replace this with your actual API call
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Assume this is the user object or token
    } else {
      //   return thunkAPI.rejectWithValue("Invalid credentials");
      return true;
    }
  }
);
