import { Router } from "./router/rootNavigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AIProvider } from "./context/AIContext";
import ScrollToTop from "./components/ui/ScrollToTop";
import BookCallWidget from "./components/Widgets/BookCallWidget";

const App = () => {
  return (
    <AIProvider>
      <ScrollToTop />
      <SpeedInsights />
      <Router />
      <BookCallWidget />
      <Analytics />
    </AIProvider>
  );
};

export default App;
