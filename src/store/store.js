import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import createProjectReducer from "./slice/createProjectSlice";
import dashboardReducer from "./slice/dashboardSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: createProjectReducer,
    dashboard: dashboardReducer,
  },
});
// store.subscribe(() => {
//   localStorage.setItem("user", JSON.stringify(store.getState()));
// });
export default store;
