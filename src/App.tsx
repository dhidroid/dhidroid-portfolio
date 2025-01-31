import { createEffect, type Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { logEvent, analytics } from "../firebaseconfig";
import { useLocation } from "@solidjs/router";
const trackPageView = () => {
  const location = useLocation();

  createEffect(() => {
    logEvent(analytics, "page_view", {
      page_path: location.pathname,
    });
  });
};
const App: Component = () => {
  return (
    <div class={styles.App}>
      <MetaProvider>
        <Title>dhidroid | Home</Title>
        <Meta name="description" content="my portfolio" />
        <Link rel="canonical" href="https://dhidroi.web.app" />
      </MetaProvider>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
