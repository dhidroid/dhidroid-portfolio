import { Router } from "./router/rootNavigation";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AIProvider } from "./context/AIContext";
import { LinkPreviewProvider } from "./components/ui/LinkPreview";
import ScrollToTop from "./components/ui/ScrollToTop";
import ChatBot from "./components/ChatBot/ChatBot";

const App = () => {
  return (
    <AIProvider>
        <ScrollToTop />

        <SpeedInsights />
        <Router />
        <ChatBot />
        <Analytics />
    </AIProvider>
  );
};

export default App;
