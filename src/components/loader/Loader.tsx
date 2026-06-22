import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import * as d3 from "d3";

interface LoaderProps {
  pageName?: string;
  pageDescription?: string;
}

interface ScatterPoint {
  label: string;
  category: string;
  x: number; // 0 - 100
  y: number; // 0 - 100
}

const Loader = ({ pageName, pageDescription }: LoaderProps = {}): React.JSX.Element => {
  const location = useLocation();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });

  const d3ContainerRef = useRef<HTMLDivElement>(null);
  const d3CanvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  const getPageTitle = (path: string) => {
    if (path === "/") return "HOME";
    if (path === "/about") return "BIOGRAPHY";
    if (path === "/skills") return "EXPERTISE";
    if (path === "/services") return "SERVICES";
    if (path === "/works" || path === "/project") return "PORTFOLIO";
    if (path.startsWith("/works/")) return "CASE STUDY";
    if (path === "/bloglist") return "JOURNAL";
    if (path.startsWith("/blog/")) return "READING";
    if (path === "/contact") return "COMMUNICATION";
    return "DHIDROID";
  };

  const getCommandsForPath = (path: string) => {
    const baseCommands = [
      "SYSTEM INITIATED",
      "ESTABLISHING HANDSHAKE",
      "COMPILING SYSTEM ASSETS",
    ];

    const pathCommands: Record<string, string[]> = {
      "/": [
        ...baseCommands,
        "MOUNTING CANVAS WORKSPACE",
        "INJECTING CORE HERO MATRIX",
        "LOADING PORTFOLIO INTERFACE",
        "COMPILING WORK EXPERIENCE",
        "HANDSHAKE ACCEPTED",
      ],
      "/about": [
        ...baseCommands,
        "RETRIEVING BIOGRAPHY DATA",
        "COMPILING TIMELINE METRIC",
        "DECODING PROFESSIONAL HISTORY",
        "LOADING SKILLS MATRIX",
        "DEVICES SYNCHRONIZED",
      ],
      "/project": [
        ...baseCommands,
        "SCANNING SANITY DATASTORE",
        "RESOLVING SYSTEM SCHEMAS",
        "PARSING GRAPH DEPENDENCIES",
        "OPTIMIZING VISUAL INDEX",
        "SCHEMAS LOADED",
      ],
      "/works": [
        ...baseCommands,
        "SCANNING SANITY DATASTORE",
        "RESOLVING SYSTEM SCHEMAS",
        "PARSING GRAPH DEPENDENCIES",
        "OPTIMIZING VISUAL INDEX",
        "SCHEMAS LOADED",
      ],
      "/bloglist": [
        ...baseCommands,
        "CONNECTING SANITY API",
        "FETCHING JOURNAL INDEX",
        "DECODING MARKDOWN STRUCTURE",
        "COMPILING METADATA HEADERS",
        "INDEX RETRIEVED",
      ],
      "/contact": [
        ...baseCommands,
        "LOADING SECURE CONTACT GATEWAY",
        "INJECTING API CONTROLLER",
        "ESTABLISHING COMMUNICATIONS",
        "GATEWAY STABLE",
      ],
    };

    if (path.startsWith("/works/")) {
      return [
        ...baseCommands,
        "LOADING PORTABLE TEXT SCHEMAS",
        "RETRIEVING STUDY METADATA",
        "MOUNTING D3 ARCHITECTURE GRAPH",
        "ASSEMBLING ASYMMETRIC GRID",
        "DATA SYNCED",
      ];
    }

    if (path.startsWith("/blog/")) {
      return [
        ...baseCommands,
        "PULLING MARKDOWN STREAM",
        "MOUNTING COMPONENT CONTROLLERS",
        "RENDER PORTABLE TEXT FLOW",
        "INITIALIZING TTS PIPELINE",
        "ARTICLE LOADED",
      ];
    }

    return pathCommands[path] || [
      ...baseCommands,
      "ANALYZING DYNAMIC ROUTE",
      "ALLOCATING GRAPHICS BUFFER",
      "INJECTING SWISS MODULES",
      "BUFFER CLEAR",
    ];
  };

  // Get dynamic scatter points data based on page content
  const getScatterDataForPath = (path: string): ScatterPoint[] => {
    if (path === "/") {
      return [
        { label: "Hero Banner", category: "UI Component", x: 15, y: 85 },
        { label: "Mesh BG Canvas", category: "Asset", x: 80, y: 92 },
        { label: "Featured Projects Grid", category: "UI Component", x: 45, y: 70 },
        { label: "Client Trust Index", category: "Data", x: 60, y: 45 },
        { label: "Work Timeline Data", category: "Data", x: 75, y: 60 },
        { label: "Matrix Rain Footer", category: "Logic", x: 90, y: 25 },
        { label: "Vercel Analytics SDK", category: "System", x: 95, y: 15 },
      ];
    }
    if (path === "/about") {
      return [
        { label: "Profile Image Node", category: "Asset", x: 20, y: 90 },
        { label: "Biography Content Schema", category: "Data", x: 35, y: 80 },
        { label: "Skills Radar Grid", category: "UI Component", x: 55, y: 72 },
        { label: "Timeline Nodes Path", category: "Logic", x: 72, y: 55 },
        { label: "SEO Config Matrix", category: "System", x: 88, y: 35 },
        { label: "Professional History Cache", category: "Data", x: 62, y: 65 },
      ];
    }
    if (path === "/works" || path === "/project" || path.startsWith("/works/")) {
      return [
        { label: "Sanity Client Gateway", category: "System", x: 22, y: 88 },
        { label: "Case Studies JSON", category: "Data", x: 42, y: 76 },
        { label: "Project Gallery CDN", category: "Asset", x: 58, y: 62 },
        { label: "Live Deployment API", category: "System", x: 78, y: 50 },
        { label: "Dynamic Tags Filter", category: "Logic", x: 68, y: 44 },
        { label: "D3 Architecture Topology", category: "UI Component", x: 92, y: 24 },
      ];
    }
    if (path === "/bloglist" || path.startsWith("/blog/")) {
      return [
        { label: "Sanity Query Engine", category: "System", x: 18, y: 82 },
        { label: "Articles Payload", category: "Data", x: 38, y: 74 },
        { label: "Markdown AST Parser", category: "Logic", x: 58, y: 62 },
        { label: "SpeechSynthesis TTS", category: "System", x: 74, y: 48 },
        { label: "Audio Podcast Controls", category: "UI Component", x: 86, y: 32 },
        { label: "Reading Time Calculator", category: "Logic", x: 92, y: 18 },
      ];
    }
    if (path === "/contact" || path === "/schedule") {
      return [
        { label: "EmailJS API Controller", category: "System", x: 12, y: 88 },
        { label: "Interactive Forms Validator", category: "UI Component", x: 34, y: 72 },
        { label: "SMTP Gateway Server", category: "System", x: 54, y: 64 },
        { label: "Cal.com Scheduler Integration", category: "UI Component", x: 76, y: 48 },
        { label: "Spam Detection Logic", category: "Logic", x: 90, y: 28 },
      ];
    }
    return [
      { label: "Router Engine Core", category: "System", x: 15, y: 85 },
      { label: "Navigation State Map", category: "Logic", x: 45, y: 65 },
      { label: "UI Layout Wrapper", category: "UI Component", x: 75, y: 45 },
      { label: "Local Assets Buffer", category: "Asset", x: 90, y: 25 },
    ];
  };

  // Keep track of logs
  useEffect(() => {
    setLines([]);
    setCurrentLineIndex(0);
    startTimeRef.current = Date.now();
  }, [location.pathname]);

  useEffect(() => {
    const commands = getCommandsForPath(location.pathname);

    if (currentLineIndex < commands.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, commands[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 450);

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, location.pathname]);

  // Handle Resize
  useEffect(() => {
    if (!d3ContainerRef.current) return;

    const handleResize = () => {
      const { clientWidth, clientHeight } = d3ContainerRef.current!;
      setDimensions({
        width: clientWidth || 300,
        height: clientHeight || 500
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle D3 Scatterplot with Shapes
  useEffect(() => {
    const canvas = d3CanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;
    const isDark = document.documentElement.classList.contains("dark");

    // Scale canvas for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const path = location.pathname;
    const points = getScatterDataForPath(path);

    // Margins to fix alignment and avoid clipping
    const margin = { top: 50, right: 60, bottom: 50, left: 60 };

    // Scales
    const xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

    // Theme values
    const primaryColor = "#5235F6";
    const fgColor = isDark ? "#F3F4F6" : "#111111";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(17, 17, 17, 0.05)";
    const axisColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(17, 17, 17, 0.12)";
    const textColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(17, 17, 17, 0.4)";

    // D3 symbol maps based on Observable standard
    const getSymbolType = (category: string) => {
      switch (category) {
        case "UI Component": return d3.symbolTriangle; // Triangle
        case "Asset": return d3.symbolStar; // Star
        case "Data": return d3.symbolDiamond; // Diamond
        case "System": return d3.symbolSquare; // Square
        case "Logic": return d3.symbolCross; // Cross
        default: return d3.symbolCircle; // Circle
      }
    };

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Compute loader progress (0 to 1 over 2.5s)
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(1, elapsed / 2500);

      // Draw dynamic grids (x and y gridlines)
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;

      const xTicks = [20, 40, 60, 80];
      const yTicks = [20, 40, 60, 80];

      xTicks.forEach(tick => {
        const x = xScale(tick);
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, height - margin.bottom);
        ctx.stroke();
      });

      yTicks.forEach(tick => {
        const y = yScale(tick);
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.stroke();
      });

      // Draw Main Axes border lines (Swiss box-plot frame style)
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(margin.left, margin.top, width - margin.left - margin.right, height - margin.top - margin.bottom);

      // Render Axes labeling (Monospace details)
      ctx.fillStyle = textColor;
      ctx.font = "7px monospace";
      ctx.textAlign = "center";

      // X-Axis ticks text
      xTicks.forEach(tick => {
        ctx.fillText(`${tick}%`, xScale(tick), height - margin.bottom + 15);
      });

      // Y-Axis ticks text
      ctx.textAlign = "right";
      yTicks.forEach(tick => {
        ctx.fillText(`${tick}%`, margin.left - 10, yScale(tick) + 2.5);
      });

      // Axis Labels
      ctx.fillStyle = fgColor;
      ctx.font = "bold 8px monospace";
      ctx.textAlign = "center";
      // X-Axis Label: complexity
      ctx.fillText("[ COMPLEXITY COMPILATION SCALE ]", width / 2, height - margin.bottom + 32);

      // Y-Axis Label: load order (Rotated)
      ctx.save();
      ctx.translate(margin.left - 38, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("[ SYSTEM EXECUTION SEQUENCE ]", 0, 0);
      ctx.restore();

      // Render dynamic scatter points (Scatterplot with shapes)
      const symbolGen = d3.symbol();

      points.forEach(point => {
        // Fly in & grow scaling animations based on load progress
        const targetX = xScale(point.x);
        const targetY = yScale(point.y);

        // Fly in from center of screen on initial stages
        const x = d3.interpolateNumber(width / 2, targetX)(progress);
        const y = d3.interpolateNumber(height / 2, targetY)(progress);

        // Size pulsing
        const baseSize = 48; // Symbol area size
        const sizePulse = 1 + Math.sin(Date.now() * 0.005 + point.x) * 0.15;
        const currentSize = baseSize * Math.min(1, progress * 1.5) * sizePulse;

        ctx.save();
        ctx.translate(x, y);

        // Draw symbol shape path
        ctx.beginPath();
        symbolGen.type(getSymbolType(point.category)).size(currentSize).context(ctx)();
        
        // Color encoding: Primary color if loaded, foreground if preparing
        ctx.fillStyle = progress > (point.x / 100) ? primaryColor : fgColor;
        ctx.fill();

        ctx.restore();

        // Render point labels (fly-in monospace text labels next to points)
        if (progress > 0.4) {
          ctx.fillStyle = fgColor;
          ctx.font = "8px monospace";
          ctx.textAlign = "left";
          ctx.fillText(
            point.label.toUpperCase(),
            x + 8,
            y + 3
          );
        }
      });

      // Draw Category Legend at top-left to avoid overlaps
      ctx.fillStyle = fgColor;
      ctx.font = "bold 7px monospace";
      ctx.textAlign = "left";
      ctx.fillText("[ SYMBOL LEGEND ]", margin.left + 8, margin.top - 20);

      const categories = [
        { label: "UI COMPONENT (▲)", color: primaryColor },
        { label: "ASSET (★)", color: fgColor },
        { label: "DATA (◆)", color: primaryColor },
        { label: "SYSTEM (■)", color: fgColor },
        { label: "LOGIC (✚)", color: primaryColor }
      ];

      categories.forEach((cat, idx) => {
        ctx.fillStyle = cat.color;
        ctx.font = "7px monospace";
        ctx.fillText(cat.label, margin.left + 8 + (idx * 60), margin.top - 8);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, location.pathname]);

  return (
    <div className="fixed inset-0 bg-background text-foreground z-[9999] flex flex-col font-sans select-none overflow-hidden">
      {/* Editorial Grid Header */}
      <div className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-border font-mono text-[10px] text-slate-400 dark:text-zinc-500 bg-white/20 dark:bg-zinc-950/20">
        <span>[ DHIDROID SYSTEM RUNTIME ]</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#5235F6] rounded-full animate-ping" />
          ROUTING SCATTERPLOT SHAPES MAP
        </span>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Left Column: Swiss typography + Console Logs (8 columns) */}
        <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 block mb-4">
              [ TARGET STAGE // INDEX ]
            </span>
            <h1 className="text-[12vw] font-bold font-display uppercase leading-[0.8] tracking-tighter text-foreground">
              {getPageTitle(location.pathname)}
            </h1>
            <p className="text-sm font-mono text-slate-400 dark:text-zinc-500 mt-6 uppercase tracking-wider">
              PATH // LOCALHOST:5173{location.pathname}
            </p>
          </div>

          {/* Console / Log stream */}
          <div className="font-mono text-xs md:text-sm text-slate-500 dark:text-zinc-400 max-w-xl space-y-2.5 mt-8 border-t border-border pt-8">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <span className="text-[#5235F6] font-bold">↳</span>
                <span>{line}</span>
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-3.5 bg-foreground align-middle"
            />
          </div>
        </div>

        {/* Right Column: D3 Animation (4 columns) */}
        <div className="lg:col-span-4 flex flex-col relative h-[380px] lg:h-full overflow-hidden bg-slate-50/50 dark:bg-zinc-950/20">
          <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-slate-400 dark:text-zinc-500">
            [ D3_SCATTERPLOT // {location.pathname.toUpperCase()} ]
          </div>

          {/* Dynamic D3 Loader Canvas */}
          <div ref={d3ContainerRef} className="w-full h-full flex items-center justify-center">
            <canvas ref={d3CanvasRef} style={{ width: "100%", height: "100%" }} className="block" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[9px] text-slate-400 dark:text-zinc-500">
            <span>SCATTER: SYNCED</span>
            <span>SHAPES: SHAPE-MAPPING</span>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="h-[2px] bg-border relative overflow-hidden">
        <motion.div
          className="h-full bg-[#5235F6]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Loader;