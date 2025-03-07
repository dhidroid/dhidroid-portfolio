import React from "react";
import { Router } from "./router/rootNavigation";
import { Analytics } from "@vercel/analytics/react"
const App = () => {
  return (
    <React.Fragment>
      <Router />
      <Analytics />
    </React.Fragment>
  );
};

export default App;
