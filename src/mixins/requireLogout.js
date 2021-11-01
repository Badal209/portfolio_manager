import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { routes } from "../route/route";

// import Spinner from "../components/Spinner";

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    const user = useSelector((state) => state.user.user);
    const history = useHistory();

    useEffect(() => {
      if (user) {
        return history.replace(routes.dashboardPage);
      }
    }, [user, history]);

    if (user) return null;

    return <ChildComponent {...props} />;
  };

  return ComposedComponent;
};
