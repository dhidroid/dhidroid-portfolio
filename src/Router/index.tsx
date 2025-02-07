import { A, Route, Router } from "@solidjs/router";
import { Component, lazy, Suspense } from "solid-js";
import { BallTriangle, SpinnerType } from "solid-spinner";

// Function to introduce a 2-second delay
const withDelay = <T,>(loader: () => Promise<T>): (() => Promise<T>) => {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(loader()), 2000);
    });
};

// Lazy load components with a 2-second delay
const Home = lazy(withDelay(() => import("../Pages/Home/HomePage")));
const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));

const RouterPage: Component = () => {
  return (
    <Router>
      <header>
        <A href="/">Home</A>
      </header>

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <BallTriangle type={SpinnerType.puff} color="#5F28FD" />
          </div>
        }
      >
        <Route path={"/"} component={Home} />
        <Route path={"*"} component={NotFound} />
      </Suspense>
    </Router>
  );
};

export default RouterPage;
