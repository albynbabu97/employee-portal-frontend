import { createSlice } from "@reduxjs/toolkit";
import { GET } from "../../services/api";

const initialState = { userList: [] };

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GET("userList", "/api/data").pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(GET("userList", "/api/data").fulfilled, (state, action) => {
      state.userList = action.payload.data;
      console.log("fullfilled");
    });
    builder.addCase(GET("userList", "/api/data").rejected, (state) => {
      console.log("error");
      state.userList = [];
    });
  },
});

export default UserSlice.reducer;
