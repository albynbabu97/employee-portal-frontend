import { createSlice } from "@reduxjs/toolkit";
import { GET, POST } from "../../services/api";

const projectList = [];
const initialState = { projectList: projectList };
const getProjectListUrl = process.env.REACT_APP_BASE_URL + '/projects';
const getProjectSearchUrl = process.env.REACT_APP_BASE_URL + '/projects/search';


export const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //list projects

    builder.addCase(
      GET("projectList", getProjectListUrl).pending,
      (state, action) => {
        console.log("pending");
      }
    );
    builder.addCase(
      GET("projectList", getProjectListUrl).fulfilled,
      (state, action) => {
        state.projectList = action.payload;
        console.log('projectList', state.projectList);

        console.log("fullfilled");
      }
    );
    builder.addCase(GET("projectList", getProjectListUrl).rejected, (state) => {
      console.log("error");
      state.projectList = [];
    });

    //search projects

    builder.addCase(
      POST("projectListSearch", getProjectSearchUrl).pending,
      (state, action) => {
        console.log("pending");
      }
    );
    builder.addCase(
      POST("projectListSearch", getProjectSearchUrl).fulfilled,
      (state, action) => {
        state.projectList = action.payload;
        console.log('projectList', state.projectList);

        console.log("fullfilled");
      }
    );
    builder.addCase(POST("projectListSearch", getProjectSearchUrl).rejected, (state) => {
      console.log("error");
      state.projectList = [];
    });
  },
});

export default ProjectSlice.reducer;
