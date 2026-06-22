import React, { useEffect, useRef, useState } from "react";
import { Delaunay } from "d3";

export const D3MeshBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });
  const pointsRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    // Generate initial nodes
    const nodes = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * 800,
        y: Math.random() * 300,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }
    pointsRef.current = nodes;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      const { clientWidth, clientHeight } = containerRef.current!;
      setDimensions({
        width: clientWidth || 800,
        height: clientHeight || 300,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * dimensions.width;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * dimensions.height;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dimensions]);

  useEffect(() => {
    let animationId: number;

    const update = () => {
      const { width, height } = dimensions;
      const nodes = pointsRef.current;
      const mouse = mouseRef.current;

      if (nodes.length === 0) {
        animationId = requestAnimationFrame(update);
        return;
      }

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Bounce off walls
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Keep inside bounds
        if (n.x < 0) n.x = 0;
        if (n.x > width) n.x = width;
        if (n.y < 0) n.y = 0;
        if (n.y > height) n.y = height;

        // Mouse attraction/push
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) * 0.003;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        // Speed limit
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.2) {
          n.vx = (n.vx / speed) * 1.2;
          n.vy = (n.vy / speed) * 1.2;
        }
      });

      // Compute Delaunay triangulation
      const svgEl = svgRef.current;
      if (svgEl) {
        try {
          const delaunay = Delaunay.from(nodes.map((d) => [d.x, d.y]));
          const meshPath = delaunay.render();

          const path = svgEl.querySelector("path.mesh");
          if (path) {
            path.setAttribute("d", meshPath);
          }

          // Render connection lines to mouse
          const connGroup = svgEl.querySelector("g.conns");
          if (connGroup) {
            while (connGroup.firstChild) {
              connGroup.removeChild(connGroup.firstChild);
            }

            if (mouse.active) {
              nodes.forEach((n) => {
                const dx = n.x - mouse.x;
                const dy = n.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                  line.setAttribute("x1", String(mouse.x));
                  line.setAttribute("y1", String(mouse.y));
                  line.setAttribute("x2", String(n.x));
                  line.setAttribute("y2", String(n.y));
                  line.setAttribute("stroke", "#5235F6");
                  line.setAttribute("stroke-width", "0.5");
                  line.setAttribute("opacity", String((100 - dist) / 100 * 0.45));
                  connGroup.appendChild(line);
                }
              });
            }
          }
        } catch (err) {
          console.warn("Delaunay mesh error:", err);
        }
      }

      animationId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
    >
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="block w-full h-full opacity-35 dark:opacity-20">
        <path className="mesh" fill="none" stroke="var(--border)" strokeWidth="0.45" strokeDasharray="3 3" />
        <g className="conns" />
      </svg>
    </div>
  );
};
