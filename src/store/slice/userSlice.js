import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: initialUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { singupAction, loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
