import { createEffect, type Component } from "solid-js";
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { logEvent, analytics } from "../firebaseconfig";
import { useLocation } from "@solidjs/router";
import RouterPage from "./Router";

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
    <div>
      <MetaProvider>
        <Title>dhidroid | Home</Title>
        <Meta name="description" content="my portfolio" />
        <Link rel="canonical" href="https://dhidroi.web.app" />
      </MetaProvider>
      <div>
        <RouterPage />
      </div>
    </div>
  );
};

export default App;
