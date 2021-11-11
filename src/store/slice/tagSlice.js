import { createSlice } from "@reduxjs/toolkit";
import { getTagTech, tagTech } from "../actions/tagAction";

const initialState = {
  tag: [],
  tags: null,
  loader: true,
};
const tagSlice = createSlice({
  name: "tag",
  initialState,
  extraReducers: {
    [tagTech.pending]: (state, action) => {
      state.loader = true;
    },
    [tagTech.fulfilled]: (state, action) => {
      state.tag = action.payload;
      state.loader = false;
    },
    [tagTech.rejected]: (state, action) => {
      state.loader = true;
    },
    [getTagTech.pending]: (state, action) => {
      state.loader = true;
    },
    [getTagTech.fulfilled]: (state, action) => {
      state.loader = false;
      state.tags = action.payload;
    },
    [getTagTech.rejected]: (state, action) => {
      state.loader = true;
    },
  },
});
export default tagSlice.reducer;
