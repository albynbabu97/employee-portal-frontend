import { createSlice } from "@reduxjs/toolkit";
import { GET } from "../../services/api";

const projectList = [];
const initialState = { projectList: projectList };

export const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GET("projectList", "/api/data").pending,
      (state, action) => {
        console.log("pending");
      }
    );
    builder.addCase(
      GET("projectList", "/api/data").fulfilled,
      (state, action) => {
        state.projectList = action.payload.data;
        console.log("fullfilled");
      }
    );
    builder.addCase(GET("projectList", "/api/data").rejected, (state) => {
      console.log("error");
      state.projectList = [];
    });
  },
});

export default ProjectSlice.reducer;
