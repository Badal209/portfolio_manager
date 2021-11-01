import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const location = useLocation();
  return (
    <div id="wrapper">
      <Sidebar />
      <div
        id="page-wrapper"
        class="gray-bg zl-toggle"
        title={location.pathname.split("/")[1]}
      >
        <Header />
        {props.children}

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
