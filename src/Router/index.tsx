import { Route, Router } from "@solidjs/router";
import { Component, lazy, Suspense } from "solid-js";

const Home = lazy(() => import("../Pages/Home/HomePage"));
const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));

const RouterPage: Component = () => {
  return (
    <Suspense fallback={<div>Loadding ...</div>}>
      <Router>
        <Route path={"/"} component={Home} />
        <Route path={"*"} component={NotFound} />
      </Router>
    </Suspense>
  );
};

export default RouterPage;
