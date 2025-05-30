import React from "react";
import { Router } from "./router/rootNavigation";
import { Analytics } from "@vercel/analytics/react"
import HomeScreen from "./pages/HeroPage/HomeScreen";
const App = () => {
  return (
    <React.Fragment>
      <Router />
      <Analytics />
      {/* <HomeScreen /> */}
    </React.Fragment>
  );
};

export default App;
