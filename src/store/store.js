import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import createProjectReducer from "./slice/createProjectSlice";
import dashboardReducer from "./slice/dashboardSlice";
import tagReducer from "./slice/tagSlice";
import getProjectReducer from "./slice/getProjectSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: createProjectReducer,
    dashboard: dashboardReducer,
    tag: tagReducer,
    getProject: getProjectReducer,
  },
});
// store.subscribe(() => {
//   localStorage.setItem("user", JSON.stringify(store.getState()));
// });
export default store;
