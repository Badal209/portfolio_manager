import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { routes } from "../route/route";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      console.log("if");
      history.push(routes.dashboardPage);
    } else {
      console.log("else");
      history.push(routes.loginPage);
    }
  }, [user, history]);
  return null;
};

export default HomePage;
