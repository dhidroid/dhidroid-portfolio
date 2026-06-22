import React, { useEffect, useRef, useState } from "react";
import { Delaunay } from "d3";

interface VoronoiStipplingAsciiProps {
  cols?: number;
  rows?: number;
  numPoints?: number;
}

export const VoronoiStipplingAscii: React.FC<VoronoiStipplingAsciiProps> = ({
  cols = 80,
  rows = 35,
  numPoints = 25,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ascii, setAscii] = useState<string>("");
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const pointsRef = useRef<[number, number][]>([]);

  // Initialize random points
  useEffect(() => {
    const points: [number, number][] = [];
    for (let i = 0; i < numPoints; i++) {
      points.push([
        Math.random() * (cols - 4) + 2,
        Math.random() * (rows - 4) + 2,
      ]);
    }
    pointsRef.current = points;
  }, [numPoints, cols, rows]);

  // Track mouse coordinates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Map mouse coordinates to grid scale
      const mouseX = ((e.clientX - rect.left) / rect.width) * cols;
      const mouseY = ((e.clientY - rect.top) / rect.height) * rows;
      mouseRef.current.x = mouseX;
      mouseRef.current.y = mouseY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cols, rows]);

  useEffect(() => {
    let animationId: number;
    let time = 0;

    const update = () => {
      time += 0.05;
      const points = pointsRef.current;
      if (points.length === 0) {
        animationId = requestAnimationFrame(update);
        return;
      }

      // 1. Update point positions (Physics + Mouse Interaction)
      const mouse = mouseRef.current;
      const targetPoints = [...points];

      // If mouse is active, let the first point follow the mouse
      if (mouse.active) {
        targetPoints[0] = [mouse.x, mouse.y];
      } else {
        // Otherwise let the first point wander around
        targetPoints[0] = [
          (cols / 2) + Math.cos(time * 0.8) * (cols * 0.25),
          (rows / 2) + Math.sin(time * 0.8) * (rows * 0.25),
        ];
      }

      // Let the rest of the points wander/drift slightly
      for (let i = 1; i < points.length; i++) {
        // Add custom noise/drift
        const angle = time * 0.3 + i * 17.3;
        targetPoints[i] = [
          points[i][0] + Math.cos(angle) * 0.08,
          points[i][1] + Math.sin(angle) * 0.08,
        ];

        // Keep points inside bounds
        if (targetPoints[i][0] < 1) targetPoints[i][0] = 1;
        if (targetPoints[i][0] > cols - 1) targetPoints[i][0] = cols - 1;
        if (targetPoints[i][1] < 1) targetPoints[i][1] = 1;
        if (targetPoints[i][1] > rows - 1) targetPoints[i][1] = rows - 1;
      }

      // 2. D3 Delaunay & Voronoi centroid calculations (Stippling step)
      try {
        const delaunay = Delaunay.from(targetPoints);
        const voronoi = delaunay.voronoi([0, 0, cols, rows]);

        for (let i = 1; i < targetPoints.length; i++) {
          const polygon = voronoi.cellPolygon(i);
          if (polygon) {
            // Calculate centroid of the cell
            let area = 0;
            let cx = 0;
            let cy = 0;
            const n = polygon.length - 1; // Polygon includes duplicate start point at the end
            for (let j = 0; j < n; j++) {
              const p1 = polygon[j];
              const p2 = polygon[j + 1];
              const factor = p1[0] * p2[1] - p2[0] * p1[1];
              area += factor;
              cx += (p1[0] + p2[0]) * factor;
              cy += (p1[1] + p2[1]) * factor;
            }
            area = area / 2;
            if (area !== 0) {
              cx = cx / (6 * area);
              cy = cy / (6 * area);

              // Stippling step: Move point toward centroid to space them out
              targetPoints[i][0] += (cx - targetPoints[i][0]) * 0.15;
              targetPoints[i][1] += (cy - targetPoints[i][1]) * 0.15;
            }
          }
        }
      } catch (err) {
        // Fallback if Delaunay fails due to collinear points
        console.warn("Delaunay calculation warning:", err);
      }

      pointsRef.current = targetPoints;

      // 3. Render Grid into ASCII representation
      let result = "";
      const chars = " .:-=+*#%@"; // density map

      for (let r = 0; r < rows; r++) {
        let rowStr = "";
        for (let c = 0; c < cols; c++) {
          // Find nearest and second nearest point index
          let minDist1 = Infinity;
          let minDist2 = Infinity;
          let nearestIdx = -1;

          for (let i = 0; i < targetPoints.length; i++) {
            const dx = c - targetPoints[i][0];
            const dy = r - targetPoints[i][1];
            const dist = dx * dx + dy * dy;

            if (dist < minDist1) {
              minDist2 = minDist1;
              minDist1 = dist;
              nearestIdx = i;
            } else if (dist < minDist2) {
              minDist2 = dist;
            }
          }

          // Boundary detection: cells where distances to closest points are very similar
          const boundaryVal = Math.sqrt(minDist2) - Math.sqrt(minDist1);
          
          if (minDist1 < 0.6) {
            // Draw generator points as distinct characters
            rowStr += nearestIdx === 0 && mouse.active ? "X" : "o";
          } else if (boundaryVal < 0.95) {
            // Draw boundaries with line-like ASCII characters
            const cellRatio = boundaryVal / 0.95;
            const charIdx = Math.floor(cellRatio * 4); // Use first few characters for subtle boundaries
            rowStr += chars[Math.max(1, charIdx)];
          } else {
            // Empty interior with occasional low density noise
            rowStr += " ";
          }
        }
        result += rowStr + "\n";
      }

      setAscii(result);
      animationId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, [cols, rows]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-auto bg-transparent select-none"
    >
      <pre className="font-mono text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] leading-none tracking-widest text-[#5235F6]/30 dark:text-[#5235F6]/20 font-bold whitespace-pre">
        {ascii}
      </pre>
    </div>
  );
};
