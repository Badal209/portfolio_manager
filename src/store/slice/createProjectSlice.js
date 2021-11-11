import { createSlice } from "@reduxjs/toolkit";
import { addProjectData } from "../actions/createProjectAction";

const initialState = {
  loader: false,
  // projects: [],
  // project: {},
};

const createProjectSlice = createSlice({
  name: "project",
  initialState,
  // reducers: {
  //   addProject: (state, action) => {
  //     state.project = action.payload;
  //   },
  // },

  extraReducers: {
    // [getProjects.pending]: (state, action) => {
    //   state.loader = true;
    // },
    // [getProjects.fulfilled]: (state, action) => {
    //   console.log("s", action.payload);
    //   state.loader = false;
    //   state.projects = action.payload;
    // },
    // [getProjects.rejected]: (state, action) => {
    //   state.loader = true;
    // },
    // [getProject.pending]: (state, action) => {
    //   state.loader = true;
    // },
    // [getProject.fulfilled]: (state, action) => {
    //   console.log(action);
    //   state.loader = false;
    //   state.project = action.payload;
    // },
    // [getProject.rejected]: (state, action) => {
    //   state.loader = true;
    // },
    [addProjectData.pending]: (state, action) => {
      state.loader = true;
    },
    [addProjectData.fulfilled]: (state, action) => {
      console.log(action);
      state.loader = false;
    },
    [addProjectData.rejected]: (state, action) => {
      state.loader = true;
    },
  },
});

// export const { addProject } = createProjectSlice.actions;
export default createProjectSlice.reducer;
