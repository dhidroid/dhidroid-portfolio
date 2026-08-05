import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

export const Loader = (): React.JSX.Element => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  const getPageTitle = (path: string) => {
    if (path === "/") return "INDEX";
    if (path === "/about") return "BIOGRAPHY";
    if (path === "/skills") return "EXPERTISE";
    if (path === "/services") return "SERVICES";
    if (path === "/works" || path === "/project") return "PORTFOLIO";
    if (path.startsWith("/works/")) return "CASE STUDY";
    if (path === "/bloglist") return "JOURNAL";
    if (path === "/blog/authors" || path === "/authors") return "AUTHORS";
    if (path.startsWith("/blog/")) return "ARTICLE";
    if (path === "/contact") return "COMMUNICATION";
    return "DHIDROID";
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(100, Math.floor((elapsed / 1800) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const formattedProgress = progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : `${progress}`;

  return (
    <div className="fixed inset-0 bg-[#FAF8F5] dark:bg-[#0C0C0E] text-slate-900 dark:text-zinc-100 z-[9999] flex flex-col justify-between p-6 md:p-12 font-sans select-none overflow-hidden transition-colors duration-300">
      
      {/* Top Monospace Bar */}
      <div className="flex justify-between items-center font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-widest border-b border-slate-300 dark:border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5235F6]" />
          <span className="font-bold text-slate-900 dark:text-white">[ DHIDROID ]</span>
        </div>
        <span className="font-bold text-slate-900 dark:text-white">[ EST. 2026 ]</span>
      </div>

      {/* Central Minimalist Spotlight */}
      <div className="flex flex-col items-center justify-center space-y-6 my-auto text-center">
        
        {/* Monospace Counter */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-[18vw] sm:text-[14vw] lg:text-[12rem] font-black font-mono leading-none tracking-tighter text-slate-900 dark:text-white"
          >
            {formattedProgress}<span className="text-[#5235F6] text-[8vw] sm:text-[6vw] lg:text-[5rem]">%</span>
          </motion.div>
        </div>

        {/* Page Title & Status */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
            STAGE // {location.pathname}
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight text-[#5235F6]">
            {getPageTitle(location.pathname)}
          </h1>
        </div>

      </div>

      {/* Bottom Monospace Telemetry & Progress Line */}
      <div className="space-y-4">
        <div className="flex justify-between items-center font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-widest border-t border-slate-300 dark:border-zinc-800 pt-4">
          <span>PATH // {window.location.origin}{location.pathname}</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {progress < 100 ? "INITIALIZING..." : "READY"}
          </span>
        </div>

        {/* Hairline Progress Line */}
        <div className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#5235F6]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default Loader;