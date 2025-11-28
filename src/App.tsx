import { Router } from "./router/rootNavigation";
import { Analytics } from "@vercel/analytics/react"
import ChatBot from "./components/ChatBot/ChatBot";

import { AIProvider } from "./context/AIContext";

const App = () => {
  return (
    <AIProvider>
      <Router />
      <ChatBot />
      <Analytics />
    </AIProvider>
  );
};

export default App;
