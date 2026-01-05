import { Router } from "./router/rootNavigation";
import { Analytics } from "@vercel/analytics/react"
import ChatBot from "./components/ChatBot/ChatBot";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AIProvider } from "./context/AIContext";
import ScrollToTop from "./components/ui/ScrollToTop";

const App = () => {
  return (
    <AIProvider>
      <ScrollToTop />

      <SpeedInsights />
      <Router />
      {/* <ChatBot /> */}
      <Analytics />
    </AIProvider>
  );
};

export default App;
