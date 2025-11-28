import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";

interface LoaderProps {
  pageName?: string;
  pageDescription?: string;
}

const TerminalLoader = ({ pageName, pageDescription }: LoaderProps = {}): React.JSX.Element => {
  const location = useLocation();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const getCommandsForPath = (path: string) => {
    const baseCommands = [
      "> initializing system...",
      "> verifying integrity...",
      "> establishing secure connection...",
    ];

    // Dynamic page-specific commands based on route
    const pathCommands: Record<string, string[]> = {
      "/": [
        ...baseCommands,
        "> loading portfolio interface...",
        "> fetching profile data...",
        "> rendering hero section...",
        "> compiling work experience...",
        "> initializing AI components...",
        "> access granted.",
      ],
      "/about": [
        ...baseCommands,
        "> retrieving biography...",
        "> decoding professional history...",
        "> loading skills matrix...",
        "> mapping expertise domains...",
        "> access granted.",
      ],
      "/project": [
        ...baseCommands,
        "> scanning repositories...",
        "> compiling project showcase...",
        "> optimizing thumbnails...",
        "> loading tech stack details...",
        "> access granted.",
      ],
      "/bloglist": [
        ...baseCommands,
        "> connecting to sanity.io...",
        "> fetching blog articles...",
        "> parsing markdown content...",
        "> formatting metadata...",
        "> access granted.",
      ],
      "/contact": [
        ...baseCommands,
        "> initializing contact form...",
        "> loading communication channels...",
        "> access granted.",
      ],
    };

    // Check if path starts with /blog/ (blog details page)
    if (path.startsWith("/blog/")) {
      return [
        ...baseCommands,
        "> fetching article content...",
        "> loading recommended posts...",
        "> initializing AI summarizer...",
        "> rendering portable text...",
        "> access granted.",
      ];
    }

    return pathCommands[path] || [
      ...baseCommands,
      "> analyzing route...",
      "> loading resources...",
      "> preparing interface...",
      "> access granted.",
    ];
  };

  useEffect(() => {
    // Reset when path changes
    setLines([]);
    setCurrentLineIndex(0);
  }, [location.pathname]);

  useEffect(() => {
    const commands = getCommandsForPath(location.pathname);

    if (currentLineIndex < commands.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, commands[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 400); // Faster animation

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, location.pathname]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center font-mono overflow-hidden">
      {/* Enhanced Blur Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#050505] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(83,21,252,0.2),_transparent_70%)] blur-3xl pointer-events-none" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5315FC]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A99DFF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-3xl p-6 relative z-10">
        <div className="border border-[#5315FC]/40 bg-black/80 backdrop-blur-2xl rounded-2xl shadow-[0_0_60px_rgba(83,21,252,0.3)] overflow-hidden">
          {/* Terminal Header with Text Truncate */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#5315FC]/30 bg-gradient-to-r from-[#5315FC]/10 to-transparent backdrop-blur-xl">
            <div className="flex space-x-2 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/70 shadow-lg shadow-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70 shadow-lg shadow-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/70 shadow-lg shadow-green-500/50" />
            </div>
            <div className="text-[#5315FC] text-xs font-semibold tracking-wider truncate ml-4">
              dhidroid@portfolio:~{location.pathname}
            </div>
          </div>

          {/* Page Metadata */}
          {(pageName || pageDescription) && (
            <div className="px-6 py-4 border-b border-[#5315FC]/20 bg-gradient-to-r from-[#5315FC]/5 to-transparent">
              {pageName && (
                <h2 className="text-[#A99DFF] font-bold text-lg mb-1 truncate">
                  {pageName}
                </h2>
              )}
              {pageDescription && (
                <p className="text-gray-400 text-sm line-clamp-2">
                  {pageDescription}
                </p>
              )}
            </div>
          )}

          {/* Terminal Body */}
          <div className="p-8 min-h-[300px] flex flex-col justify-end items-start backdrop-blur-sm">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#A99DFF] text-sm md:text-base mb-2 font-bold tracking-wide"
                style={{ 
                  textShadow: "0 0 10px rgba(83, 21, 252, 0.6), 0 0 20px rgba(169, 157, 255, 0.3)"
                }}
              >
                {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-5 bg-gradient-to-r from-[#5315FC] to-[#A99DFF] ml-1 inline-block align-middle shadow-lg shadow-[#5315FC]/50"
            />
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-black/50 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#5315FC] via-[#A99DFF] to-[#5315FC]"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="mt-6 text-center text-gray-400 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Loading your experience...
        </motion.div>
      </div>
    </div>
  );
};

export default TerminalLoader;