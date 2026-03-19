import { Router } from "./router/rootNavigation";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AIProvider } from "./context/AIContext";
import { LinkPreviewProvider } from "./components/ui/LinkPreview";
import ScrollToTop from "./components/ui/ScrollToTop";

const App = () => {
  return (
    <AIProvider>
      <LinkPreviewProvider>
        <ScrollToTop />

        <SpeedInsights />
        <Router />
        <Analytics />
      </LinkPreviewProvider>
    </AIProvider>
  );
};

export default App;
