import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface PointNode {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  isLocation?: boolean;
  name?: string;
}

// Low-resolution GeoJSON coordinate dataset of world land outlines
const worldGeoJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: { name: "North America" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [-168, 65], [-120, 70], [-80, 75], [-60, 50], [-50, 45], [-80, 25],
          [-90, 15], [-100, 20], [-115, 30], [-125, 48], [-168, 65]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { name: "South America" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [-80, 10], [-40, -5], [-35, -10], [-45, -35], [-70, -55], [-75, -45],
          [-80, -15], [-80, 10]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { name: "Africa" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [-17, 32], [10, 30], [30, 30], [50, 10], [40, -15], [30, -33],
          [20, -34], [10, 5], [-10, 5], [-17, 15], [-17, 32]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { name: "Eurasia" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [-10, 36], [10, 55], [30, 70], [80, 73], [120, 75], [170, 70],
          [140, 35], [120, 20], [108, 15], [80, 10], [75, 10], [50, 12],
          [35, 15], [35, 30], [25, 35], [10, 36], [-10, 36]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { name: "India" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [68, 23], [78, 30], [88, 25], [80, 8], [68, 23]
        ]]
      }
    },
    {
      type: "Feature" as const,
      properties: { name: "Australia" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[
          [113, -22], [130, -12], [145, -15], [150, -33], [140, -38],
          [115, -34], [113, -22]
        ]]
      }
    }
  ]
};

// Dhinesh's physical coordinates
const myLocations = [
  { name: "Chennai, TN, IN", coords: [80.2707, 13.0827] },
  { name: "Salem, TN, IN", coords: [78.1460, 11.6643] }
];

export const D3MapVoronoiStippling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const pointsRef = useRef<PointNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Update size
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      const { clientWidth } = containerRef.current!;
      const h = Math.max(300, Math.min(500, clientWidth * 0.5));
      setDimensions({
        width: clientWidth || 800,
        height: h
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute map coordinates based on projection on resize
  useEffect(() => {
    const { width, height } = dimensions;
    
    // 1. Create Mercator projection focused on global view
    const projection = d3.geoMercator()
      .translate([width / 2, height / 2 + 30])
      .scale(width / 6.2); // scale factor fitting land

    // 2. Project land polygons to screen-space coordinates
    const projectedPolys: [number, number][][] = [];
    worldGeoJSON.features.forEach((feature) => {
      feature.geometry.coordinates.forEach((ring) => {
        const projectedRing: [number, number][] = [];
        ring.forEach((coord) => {
          const pt = projection([coord[0], coord[1]]);
          if (pt) projectedRing.push([pt[0], pt[1]]);
        });
        if (projectedRing.length > 0) projectedPolys.push(projectedRing);
      });
    });

    // 3. Generate stipple points inside land polygons
    const nodes: PointNode[] = [];
    const gridSize = 14; // pixels distance
    
    for (let x = gridSize / 2; x < width; x += gridSize) {
      for (let y = gridSize / 2; y < height; y += gridSize) {
        // Check if coordinate point falls inside any continent polygon
        let isInside = false;
        for (let p = 0; p < projectedPolys.length; p++) {
          if (d3.polygonContains(projectedPolys[p], [x, y])) {
            isInside = true;
            break;
          }
        }

        if (isInside) {
          nodes.push({
            x: x + (Math.random() - 0.5) * 3,
            y: y + (Math.random() - 0.5) * 3,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0
          });
        }
      }
    }

    // 4. Inject Dhinesh's physical coordinates
    myLocations.forEach((loc) => {
      const pt = projection([loc.coords[0], loc.coords[1]]);
      if (pt) {
        nodes.push({
          x: pt[0],
          y: pt[1],
          ox: pt[0],
          oy: pt[1],
          vx: 0,
          vy: 0,
          isLocation: true,
          name: loc.name
        });
      }
    });

    pointsRef.current = nodes;
  }, [dimensions]);

  // Track cursor coordinates
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

  // D3 Relaxation and dynamic stippling drawing loop
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    let animationId: number;
    let time = 0;

    const tick = () => {
      time += 0.03;
      const { width, height } = dimensions;
      const nodes = pointsRef.current;

      if (nodes.length === 0) {
        animationId = requestAnimationFrame(tick);
        return;
      }

      // Physics + mouse coordinates repel
      const mouse = mouseRef.current;
      nodes.forEach((n) => {
        if (n.isLocation) return; // Lock locations in place
        
        // natural drift
        n.x += Math.cos(time + n.ox * 0.1) * 0.1;
        n.y += Math.sin(time + n.oy * 0.1) * 0.1;

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            const force = (60 - dist) * 0.05;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }
      });

      // Lloyd's relaxation stippling step
      try {
        const delaunay = d3.Delaunay.from(nodes.map(p => [p.x, p.y]));
        const voronoi = delaunay.voronoi([0, 0, width, height]);

        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].isLocation) continue;
          
          const polygon = voronoi.cellPolygon(i);
          if (polygon) {
            let area = 0;
            let cx = 0;
            let cy = 0;
            const n = polygon.length - 1;
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

              // Pull coordinate back to its relaxed centroid position
              nodes[i].x += (cx - nodes[i].x) * 0.04;
              nodes[i].y += (cy - nodes[i].y) * 0.04;
            }
          }
        }

        // Draw boundaries
        const cellPaths = nodes.map((_, i) => voronoi.renderCell(i)).filter(Boolean);
        const boundaries = svg.selectAll("path.cell").data(cellPaths);
        boundaries.enter()
          .append("path")
          .attr("class", "cell")
          .merge(boundaries as any)
          .attr("d", d => d)
          .attr("fill", "transparent")
          .attr("stroke", "var(--border)")
          .attr("stroke-width", "0.35")
          .attr("opacity", 0.45);
        boundaries.exit().remove();

      } catch (err) {
        // Fallback silently if collinear triangulation errors occur
      }

      // Draw Stipples
      const dots = svg.selectAll("circle.stipple").data(nodes);
      dots.enter()
        .append("circle")
        .attr("class", "stipple")
        .merge(dots as any)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.isLocation ? 4.5 : 1.1)
        .attr("fill", d => d.isLocation ? "#5235F6" : "var(--foreground)")
        .attr("opacity", d => d.isLocation ? 1.0 : 0.35);
      dots.exit().remove();

      // Pulsing location radars
      const locationNodes = nodes.filter(n => n.isLocation);
      const radars = svg.selectAll("circle.radar").data(locationNodes);
      radars.enter()
        .append("circle")
        .attr("class", "radar")
        .merge(radars as any)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", () => 8 + Math.abs(Math.sin(time * 2)) * 10)
        .attr("fill", "none")
        .attr("stroke", "#5235F6")
        .attr("stroke-width", "0.75")
        .attr("opacity", () => 0.85 - Math.abs(Math.sin(time * 2)) * 0.7);
      radars.exit().remove();

      // Location Labels
      const labels = svg.selectAll("text.loc-label").data(locationNodes);
      labels.enter()
        .append("text")
        .attr("class", "loc-label")
        .merge(labels as any)
        .attr("x", d => d.x + 8)
        .attr("y", d => d.y - 8)
        .attr("font-family", "monospace")
        .attr("font-size", "8px")
        .attr("fill", "var(--foreground)")
        .attr("font-weight", "bold")
        .text(d => d.name || "");
      labels.exit().remove();

      // Draw Connection lines to cursor
      if (mouse.active) {
        const nearNodes = nodes.filter(d => {
          const dist = Math.sqrt((d.x - mouse.x) ** 2 + (d.y - mouse.y) ** 2);
          return dist < 80;
        });

        const lines = svg.selectAll("line.conn").data(nearNodes);
        lines.enter()
          .append("line")
          .attr("class", "conn")
          .merge(lines as any)
          .attr("x1", mouse.x)
          .attr("y1", mouse.y)
          .attr("x2", d => d.x)
          .attr("y2", d => d.y)
          .attr("stroke", "#5235F6")
          .attr("stroke-width", "0.5")
          .attr("stroke-dasharray", "1 2")
          .attr("opacity", d => {
            const dist = Math.sqrt((d.x - mouse.x) ** 2 + (d.y - mouse.y) ** 2);
            return (80 - dist) / 80 * 0.65;
          });
        lines.exit().remove();
      } else {
        svg.selectAll("line.conn").remove();
      }

      animationId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <div ref={containerRef} className="relative w-full border border-border rounded-sm bg-white/20 dark:bg-zinc-950/20 overflow-hidden select-none pb-4">
      {/* Telemetry metadata header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-border bg-slate-100/50 dark:bg-zinc-900/50 text-[10px] font-mono tracking-widest text-slate-400 dark:text-zinc-500">
        <span>[ WORLD GEOGRAPHIC projection MAP D3 ]</span>
        <div className="flex gap-4">
          <span>SALEM // CHENNAI</span>
          <span className="animate-pulse">● RADAR ONLINE</span>
        </div>
      </div>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block"
      />
    </div>
  );
};
