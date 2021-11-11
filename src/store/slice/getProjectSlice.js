import { createSlice } from "@reduxjs/toolkit";
import { getProject, getProjects } from "../actions/createProjectAction";

const initialState = {
  loader: false,
  projects: [],
  project: {},
};
const getProjectData = createSlice({
  name: "getProject",
  initialState,
  extraReducers: {
    [getProjects.pending]: (state, action) => {
      state.loader = true;
    },
    [getProjects.fulfilled]: (state, action) => {
      console.log("s", action.payload);
      state.loader = false;
      state.projects = action.payload;
    },
    [getProjects.rejected]: (state, action) => {
      state.loader = true;
    },
    [getProject.pending]: (state, action) => {
      state.loader = true;
    },
    [getProject.fulfilled]: (state, action) => {
      console.log("getProjectData", action);
      state.loader = false;
      state.project = action.payload;
    },
    [getProject.rejected]: (state, action) => {
      state.loader = true;
    },
  },
});
export default getProjectData.reducer;
