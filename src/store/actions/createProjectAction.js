import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getProjects = createAsyncThunk("project", async () => {
  const response = await axios.get(
    "https://fir-646b6-default-rtdb.firebaseio.com/project.json"
  );
  return response.data;
});
export const getProject = createAsyncThunk("project", async (id) => {
  console.log("hytdjfnhtedhtghg");
  const response = await axios.get(
    `https://fir-646b6-default-rtdb.firebaseio.com/project/${id}.json`
  );
  console.log("GET_PROJECT", response);

  return response.data;
});
export const addProjectData = createAsyncThunk("project", async (data) => {
  console.log("hytdjfnhtedhtghg");
  const response = await axios.get(
    "https://fir-646b6-default-rtdb.firebaseio.com/project.json",
    data
  );
  console.log("GET_PROJECT_DATA", response);

  return response.data;
});
