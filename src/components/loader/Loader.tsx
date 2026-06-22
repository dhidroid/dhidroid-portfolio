import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import * as d3 from "d3";

interface LoaderProps {
  pageName?: string;
  pageDescription?: string;
}

interface D3Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  angle?: number;
  speed?: number;
  baseRadius?: number;
}

const Loader = ({ pageName, pageDescription }: LoaderProps = {}): React.JSX.Element => {
  const location = useLocation();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });

  const d3ContainerRef = useRef<HTMLDivElement>(null);
  const d3CanvasRef = useRef<HTMLCanvasElement>(null);

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

  // Keep track of logs
  useEffect(() => {
    setLines([]);
    setCurrentLineIndex(0);
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

  // Handle D3 dynamically based on route
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

    // Theme values
    const primaryColor = "#5235F6";
    const fgColor = isDark ? "rgba(243, 244, 246, 0.9)" : "rgba(17, 17, 17, 0.9)";
    const muteColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(17, 17, 17, 0.05)";
    const lineColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(17, 17, 17, 0.12)";

    // Set up D3 animation loop variables
    let particles: D3Particle[] = [];
    let animationFrameId: number;

    if (path === "/") {
      // 1. Orbit Vortex for Home Page
      const count = 40;
      particles = Array.from({ length: count }, (_, i) => {
        const radius = 20 + (i * (Math.min(width, height) * 0.4)) / count;
        return {
          x: width / 2,
          y: height / 2,
          vx: 0,
          vy: 0,
          radius: 1.5,
          angle: Math.random() * Math.PI * 2,
          speed: (0.015 + Math.random() * 0.02) * (i % 2 === 0 ? 1 : -1),
          baseRadius: radius
        };
      });
    } else if (path === "/about") {
      // 2. Delaunay Triangulation for About Page
      const count = 25;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 2
      }));
    } else if (path === "/works" || path === "/project" || path.startsWith("/works/")) {
      // 3. Constellation Node Net for Portfolio/Case Study
      const count = 35;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 2.5
      }));
    } else if (path === "/bloglist" || path.startsWith("/blog/")) {
      // 4. Data bubble stream for Blog list/details
      const count = 45;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.5 - Math.random() * 0.8,
        radius: 2 + Math.random() * 4
      }));
    } else {
      // 5. Default: Radar / Pulser
      particles = Array.from({ length: 4 }, (_, i) => ({
        x: width / 2,
        y: height / 2,
        vx: 0,
        vy: 0,
        radius: 0,
        speed: 0.5 + i * 0.5
      }));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid
      ctx.strokeStyle = muteColor;
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (path === "/") {
        // Draw Vortex
        ctx.strokeStyle = muteColor;
        ctx.lineWidth = 0.5;

        // Draw orbital concentric rings
        for (let i = 1; i <= 6; i++) {
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, (Math.min(width, height) * 0.4) * (i / 6), 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw dots
        particles.forEach(p => {
          p.angle = (p.angle || 0) + (p.speed || 0);
          p.x = width / 2 + Math.cos(p.angle) * (p.baseRadius || 50);
          p.y = height / 2 + Math.sin(p.angle) * (p.baseRadius || 50);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.fill();

          // Connect back to center with very faint line
          ctx.beginPath();
          ctx.moveTo(width / 2, height / 2);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = "rgba(82, 53, 246, 0.05)";
          ctx.stroke();
        });
      } else if (path === "/about") {
        // Draw Delaunay Triangulation
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        });

        // Compute Delaunay
        const points = particles.map(p => [p.x, p.y]);
        const delaunay = d3.Delaunay.from(points);
        const { halfedges, triangles } = delaunay;

        // Draw triangles
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < halfedges.length; ++i) {
          const j = halfedges[i];
          if (j < i) continue;
          const ti = triangles[i];
          const tj = triangles[j];
          ctx.beginPath();
          ctx.moveTo(points[ti][0], points[ti][1]);
          ctx.lineTo(points[tj][0], points[tj][1]);
          ctx.stroke();
        }

        // Draw node points
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.fill();
        });
      } else if (path === "/works" || path === "/project" || path.startsWith("/works/")) {
        // Draw constellation networks
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        });

        // Draw links between nearby particles
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.75;
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 70) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${0.12 * (1 - dist / 70)})` : `rgba(17, 17, 17, ${0.1 * (1 - dist / 70)})`;
              ctx.stroke();
            }
          }
        }

        // Draw particles
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = fgColor;
          ctx.fill();
        });
      } else if (path === "/bloglist" || path.startsWith("/blog/")) {
        // Bubble streams rising
        particles.forEach(p => {
          p.y += p.vy;
          p.x += p.vx;

          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.x < 0 || p.x > width) p.vx *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(82, 53, 246, 0.4)" : "rgba(82, 53, 246, 0.2)";
          ctx.fill();
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      } else {
        // Concentric pulsing sonar pings
        particles.forEach((p, idx) => {
          p.radius += p.speed || 1;
          if (p.radius > Math.max(width, height) * 0.6) {
            p.radius = 0;
          }

          ctx.beginPath();
          ctx.arc(width / 2, height / 2, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${0.15 * (1 - p.radius / (Math.max(width, height) * 0.6))})` : `rgba(17, 17, 17, ${0.1 * (1 - p.radius / (Math.max(width, height) * 0.6))})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Pulsing core dot
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 4, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.fill();
      }

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
          ROUTING CONTROLLER INJECTED
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
        <div className="lg:col-span-4 flex flex-col relative h-[300px] lg:h-full overflow-hidden bg-slate-50/50 dark:bg-zinc-950/20">
          <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-slate-400 dark:text-zinc-500">
            [ D3_VISUALIZATION // {location.pathname.toUpperCase()} ]
          </div>

          {/* Dynamic D3 Loader Canvas */}
          <div ref={d3ContainerRef} className="w-full h-full flex items-center justify-center">
            <canvas ref={d3CanvasRef} style={{ width: "100%", height: "100%" }} className="block" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[9px] text-slate-400 dark:text-zinc-500">
            <span>MEM: SYNCED</span>
            <span>ENG: STABLE</span>
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