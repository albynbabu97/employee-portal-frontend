import { createSlice } from "@reduxjs/toolkit";
import { GET, POST } from "../../services/api";

const initialState = { userList: [] };
const getUsersListUrl = process.env.REACT_APP_BASE_URL + '/users';
const getUsersSearchListUrl = process.env.REACT_APP_BASE_URL + '/users/search';



export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //list users
    builder.addCase(GET("userList", getUsersListUrl).pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(GET("userList", getUsersListUrl).fulfilled, (state, action) => {
      state.userList = action.payload;
      console.log("fullfilled");
    });
    builder.addCase(GET("userList", getUsersListUrl).rejected, (state) => {
      console.log("error");
      state.userList = [];
    });
    //search users

    builder.addCase(POST("userListSearch", getUsersSearchListUrl).pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(POST("userListSearch", getUsersSearchListUrl).fulfilled, (state, action) => {
      state.userList = action.payload;
      console.log("fullfilled");
    });
    builder.addCase(POST("userListSearch", getUsersSearchListUrl).rejected, (state) => {
      console.log("error");
      state.userList = [];
    });
  },
});

export default UserSlice.reducer;
