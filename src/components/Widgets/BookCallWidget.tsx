import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ArrowRight, Sparkles, CalendarIcon } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

export const BookCallWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", {
          styles: { branding: { brandColor: "#5235F6" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.error("Cal.com init error:", err);
      }
    })();
  }, []);

  // Scroll detection: Collapses during scroll or when scrolled down, expands on hover
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
      setIsScrolledDown(window.scrollY > 120);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1200); // 1.2s after scroll stops
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Hide floating widget if user is on the dedicated schedule page
  if (location.pathname === "/schedule") {
    return null;
  }

  // Expanded state condition:
  // Expanded if hovered OR (at top of page AND not actively scrolling)
  const isExpanded = isHovered || (!isScrolledDown && !isScrolling);

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center justify-center bg-[#5235F6] text-white shadow-2xl border border-white/20 font-mono text-xs font-bold tracking-wider hover:bg-slate-900 group cursor-pointer ${
            isExpanded ? "px-4 py-3 rounded-sm gap-2.5" : "w-12 h-12 rounded-sm p-0"
          }`}
          aria-label="Book 1:1 Call Widget"
        >
          <Calendar className="w-4 h-4 text-white shrink-0" />

          {/* Expandable Label Text */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
              >
                <span>BOOK 1:1 CALL</span>
                <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-[9px] font-bold">
                  30M
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Floating Book Call Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-8 z-50 w-[92vw] sm:w-[460px] max-h-[85vh] bg-[#FAF8F5] dark:bg-[#0C0C0E] border-2 border-slate-900 dark:border-zinc-700 shadow-2xl rounded-sm overflow-hidden flex flex-col font-sans"
          >
            {/* Header Bar */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-bold">BOOK 1:1 CALL</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white cursor-pointer"
                aria-label="Close Schedule Widget"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sub-header info */}
            <div className="p-4 bg-white  border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center font-mono text-[11px] text-slate-500">
              <span>WITH DHINESHKUMAR THIRUPATHI (Dhidroid)</span>
              <span className="font-bold text-[#5235F6]">30 MIN FREE</span>
            </div>

            {/* Cal.com Embed Container */}
            <div className="flex-1 overflow-y-auto p-2 bg-white dark:bg-zinc-950 min-h-[420px]">
              <Cal
                namespace="30min"
                calLink="dhidroid/30min"
                style={{ width: "100%", height: "100%", minHeight: "420px" }}
                config={{ layout: "month_view", theme: "light" }}
              />
            </div>

            {/* Footer Action */}
            <div className="p-3 bg-slate-100 dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">NEED A CUSTOM SCOPE?</span>
              <Link
                to="/schedule"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 text-[#5235F6] font-bold uppercase hover:underline"
              >
                <span>Full Schedule Page</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookCallWidget;
