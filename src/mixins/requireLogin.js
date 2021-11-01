import React from "react";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    const user = useSelector((state) => state.user.user);
    console.log("USER", user);

    // if (isLoading) {
    //     return <Spinner />
    // }
    if (!user) {
      return <LoginPage />;
    }

    return <ChildComponent {...props} />;
  };

  return ComposedComponent;
};
