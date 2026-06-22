import React, { useEffect, useRef, useState } from "react";

interface MatrixDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
}

export const D3FooterAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 160 });

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      const { clientWidth } = containerRef.current!;
      setDimensions({
        width: clientWidth || 600,
        height: 160
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
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

    // Setup offscreen canvas to render static "DHIDROID" text for lookup
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    
    if (octx) {
      octx.fillStyle = "#000000";
      // Large bold display font for Swiss style
      octx.font = "900 68px 'Instrument Sans', sans-serif";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText("DHIDROID", width / 2, height / 2);
    }

    // Capture pixel data of text to do fast lookup
    const imgData = octx ? octx.getImageData(0, 0, width, height) : null;
    const pixels = imgData ? imgData.data : null;

    const checkTextPixel = (x: number, y: number) => {
      if (!pixels) return false;
      const px = Math.floor(x);
      const py = Math.floor(y);
      if (px < 0 || px >= width || py < 0 || py >= height) return false;
      const idx = (py * width + px) * 4;
      return pixels[idx + 3] > 100; // Check alpha channel
    };

    // Matrix characters pool
    const charPool = "01$#@%&*?+=/\\ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // Setup drops columns
    const fontSize = 12;
    const columns = Math.ceil(width / fontSize);
    const drops: MatrixDrop[] = [];

    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * -height,
        speed: 1.5 + Math.random() * 2,
        chars: Array.from({ length: 15 }, () => charPool[Math.floor(Math.random() * charPool.length)])
      });
    }

    let mouseX: number | null = null;
    let mouseY: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;

    const draw = () => {
      // Clear with slight opacity to create fading trails
      ctx.fillStyle = isDark ? "rgba(12, 12, 14, 0.18)" : "rgba(245, 245, 245, 0.18)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";

      drops.forEach((drop) => {
        // Shift characters pool slightly for scrolling feeling
        if (Math.random() < 0.1) {
          drop.chars.shift();
          drop.chars.push(charPool[Math.floor(Math.random() * charPool.length)]);
        }

        // Apply mouse interaction
        let targetX = drop.x;
        let speedMultiplier = 1;
        if (mouseX !== null && mouseY !== null) {
          const dx = drop.x - mouseX;
          const dy = drop.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            // Push columns away from mouse or speed them up
            targetX += (dx / dist) * 15 * (1 - dist / 80);
            speedMultiplier = 1.8;
          }
        }

        // Draw trail of characters
        for (let j = 0; j < drop.chars.length; j++) {
          const charY = drop.y - j * fontSize;
          if (charY < 0 || charY > height) continue;

          const isInsideText = checkTextPixel(targetX, charY);
          const opacity = (1 - j / drop.chars.length);

          if (isInsideText) {
            // Primary Accent Color (#5235F6) for DHIDROID text shape
            ctx.fillStyle = `rgba(82, 53, 246, ${opacity})`;
            ctx.font = `bold ${fontSize}px monospace`;
          } else {
            // Muted background characters
            ctx.fillStyle = isDark 
              ? `rgba(255, 255, 255, ${opacity * 0.08})` 
              : `rgba(17, 17, 17, ${opacity * 0.06})`;
            ctx.font = `${fontSize}px monospace`;
          }

          ctx.fillText(drop.chars[j], targetX, charY);
        }

        // Advance drop
        drop.y += drop.speed * speedMultiplier;

        // Reset drop to top if it leaves screen
        if (drop.y - drop.chars.length * fontSize > height) {
          drop.y = Math.random() * -30;
          drop.speed = 1.5 + Math.random() * 2;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="relative w-full border border-border bg-slate-50/50 dark:bg-zinc-950/20 overflow-hidden select-none font-mono">
      <div className="flex justify-between items-center px-4 py-2 border-b border-border text-[9px] text-slate-400 dark:text-zinc-500 uppercase tracking-widest bg-white/20 dark:bg-black/20">
        <span>[ footer.d3_matrix_engine ]</span>
        <span className="flex items-center gap-1.5 text-[#5235F6] font-bold">
          <span className="w-1.5 h-1.5 bg-[#5235F6] rounded-full animate-ping" />
          ACTIVE MATRIX GRAPH
        </span>
      </div>
      <canvas ref={canvasRef} style={{ width: "100%", height: "160px" }} className="block" />
    </div>
  );
};
