import Logout from "../components/Layout/Logout";
import requireLogin from "../mixins/requireLogin";
import requireLogout from "../mixins/requireLogout";
import { routes } from "../route/route";
import CreateProjectPage from "./CreateProjectPage";
import DashBoardPage from "./DashboardPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import ProjectDetailsPage from "./ProjectDetailsPage";
import TagPage from "./TagPage";

export default {
  [routes.loginPage]: requireLogout(LoginPage),
  [routes.homePage]: requireLogout(HomePage),
  [routes.dashboardPage]: requireLogin(DashBoardPage),
  [routes.tagPage]:requireLogin(TagPage),
  [routes.createProjectPage]: requireLogin(CreateProjectPage),
  [routes.ProjectEditPage]: requireLogin(CreateProjectPage),
  [routes.ProjectDetailsPage]: requireLogin(ProjectDetailsPage),
  [routes.logout]: Logout,
};
