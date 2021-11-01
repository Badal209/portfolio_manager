import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./assets/css/bootstrap.min.css";
import "./assets/css/all.css";
import "./assets/css/fontawesome.css";
import "./assets/css/brands.css";
import "./assets/css/solid.css";
import "./assets/css/theme.css";
import "./assets/css/style.css";
import "./assets/css/awesome-bootstrap-checkbox.css";
import "./assets/css/select2.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
