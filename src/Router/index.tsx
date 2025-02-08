import { A, Route, Router } from "@solidjs/router";
import { Component, lazy, Suspense } from "solid-js";
import { BallTriangle, SpinnerType } from "solid-spinner";
import NavData, { socialLinks } from "../utils/data/navData.js";
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

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        "justify-content": "space-between",
        "align-items": "center",
        padding: "16px 32px",
        "font-size": "14px",
        "margin-top": "auto",
      }}
    >
      <span>© {new Date().getFullYear()} dhidroid. All rights reserved.</span>
      <div style={{ display: "flex", gap: "15px" }}>
        {Object.entries(socialLinks).map(([key, url]) =>
          url ? (
            <A href={url} target="_blank" rel="noopener noreferrer">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </A>
          ) : null
        )}
      </div>
    </footer>
  );
};

const Nav = (props: any) => {
  return (
    <>
      <nav
        style={{
          display: "flex",
          "justify-content": "space-evenly",
          "flex-direction": "row",
        }}
      >
        <A href="/">dhidroid</A>
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <A href="/project">Project</A>
          <A href="/blog">Blog</A>
          <A href="/about">About</A>
        </div>
      </nav>
      {props.children}
      <Footer />
    </>
  );
};
const RouterPage: Component = () => {
  return (
    <>
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
        <Router root={Nav}>
          <Route path={"/"} component={Home} />
          <Route path={"*"} component={NotFound} />
        </Router>
      </Suspense>
    </>
  );
};

export default RouterPage;
