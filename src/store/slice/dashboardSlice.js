import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const dasboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getProjectsList: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { getProjectsList } = dasboardSlice.actions;
export default dasboardSlice.reducer;
