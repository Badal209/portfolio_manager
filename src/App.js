import { Suspense, useCallback, useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router";
import "./App.css";
import Layout from "./components/Layout/Layout";
// import Page404 from "./components/Page404";
import Page404 from "./components/Page404";

import "./assets/css/select2.min.css";

import pages from "./pages";

function App() {
  const [routes, setRoutes] = useState(null);

  const renderRoutes = useCallback(() => {
    if (routes) {
      return;
    }

    let _routes = Object.keys(pages).map((item) => (
      <Route
        key={`route_${item}`}
        exact
        path={item}
        component={withRouter(pages[item])}
      />
    ));

    setRoutes(_routes);
    // console.log("_routes", _routes);
  }, [routes]);

  useEffect(() => {
    renderRoutes();
  }, [renderRoutes]);

  return (
    <Suspense fallback={null}>
      <Layout>
        <Switch>
          {routes}
          <Route component={Page404} />
        </Switch>
      </Layout>
    </Suspense>
  );
}

export default App;
