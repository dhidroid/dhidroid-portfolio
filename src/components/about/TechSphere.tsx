import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Container } from "../ui/Container";
import { cn } from "../../utils/cn";

interface NodeData {
  name: string;
  children?: NodeData[];
}

const expertiseData: NodeData = {
  name: "STUDIO",
  children: [
    {
      name: "FRONTEND STACK",
      children: [
        { name: "React.js" },
        { name: "TypeScript" },
        { name: "Next.js" },
        { name: "Tailwind v4" },
        { name: "JavaScript" },
        { name: "HTML5 / CSS3" }
      ]
    },
    {
      name: "MOBILE CORE",
      children: [
        { name: "React Native" },
        { name: "Kotlin (Android)" },
        { name: "Swift (iOS)" },
        { name: "Bridge Modules" }
      ]
    },
    {
      name: "BACKEND & DEVOPS",
      children: [
        { name: "Go (Golang)" },
        { name: "Node.js (Express)" },
        { name: "AWS (S3/EC2)" },
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "GraphQL APIs" }
      ]
    },
    {
      name: "WORKFLOW TOOLS",
      children: [
        { name: "Docker" },
        { name: "Git / GitHub" },
        { name: "Figma (UI/UX)" },
        { name: "CI/CD Actions" }
      ]
    }
  ]
};

export const TechSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [angleOffset, setAngleOffset] = useState(0);
  const rotationActive = useRef(true);

  // Resize listener
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      const { clientWidth } = containerRef.current!;
      const size = Math.max(320, Math.min(600, clientWidth));
      setDimensions({ width: size, height: size });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Natural slow rotation loop
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (rotationActive.current) {
        setAngleOffset((prev) => (prev + 0.001) % (2 * Math.PI));
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const { width, height } = dimensions;
  const radius = width / 2;
  const innerRadius = radius - 100;

  // D3 Cluster computation
  const root = d3.hierarchy(expertiseData);
  const clusterLayout = d3.cluster<NodeData>().size([2 * Math.PI, innerRadius]);
  clusterLayout(root);

  // Helper to project radial coords to 2D screen coords
  const project = (x: number, y: number) => {
    // Apply angle offset for auto-rotation
    const angle = x + angleOffset - Math.PI / 2;
    return [y * Math.cos(angle), y * Math.sin(angle)];
  };

  // Check if a node is in the path of the hovered node
  const isHighlighted = (node: any) => {
    if (!hoveredNode) return false;
    let curr = hoveredNode;
    while (curr) {
      if (curr === node) return true;
      curr = curr.parent;
    }
    // Also highlight children of hovered node
    let isChild = false;
    const checkChildren = (n: any) => {
      if (n === node) {
        isChild = true;
        return;
      }
      if (n.children) {
        n.children.forEach(checkChildren);
      }
    };
    checkChildren(hoveredNode);
    return isChild;
  };

  const links = root.links();
  const descNodes = root.descendants();

  return (
    <section className="py-24 bg-background border-t border-border overflow-hidden select-none">
      <Container className="px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#5235F6] mb-3">
            [ SKILLS & ECOSYSTEM CLUSTER ]
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-foreground mb-4">
            Technical Expertise
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-xl leading-relaxed">
            A dynamic ecosystem of tools and technologies I use to build scalable mobile apps and web solutions, mapped as a radial dependency graph.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full flex items-center justify-center"
        >
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="overflow-visible"
            onMouseEnter={() => {
              rotationActive.current = false;
            }}
            onMouseLeave={() => {
              rotationActive.current = true;
              setHoveredNode(null);
            }}
          >
            {/* Center origin */}
            <g transform={`translate(${width / 2}, ${height / 2})`}>
              
              {/* Draw fanning grid links */}
              {links.map((link, i) => {
                const [x1, y1] = project(link.source.x, link.source.y);
                const [x2, y2] = project(link.target.x, link.target.y);
                
                const active = isHighlighted(link.target) || isHighlighted(link.source);

                return (
                  <path
                    key={i}
                    d={`M${x1},${y1}C${(x1 + x2) / 2},${(y1 + y2) / 2} ${x1},${y2} ${x2},${y2}`}
                    fill="none"
                    stroke={active ? "#5235F6" : "var(--border)"}
                    strokeWidth={active ? "1.5" : "0.5"}
                    opacity={active ? 0.95 : 0.4}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Draw Nodes */}
              {descNodes.map((node: any, i) => {
                const [cx, cy] = project(node.x, node.y);
                const active = isHighlighted(node);
                const isRoot = node.depth === 0;
                const isBranch = node.depth === 1;

                // Rotate labels aligned along node angles
                const labelAngle = ((node.x + angleOffset) * 180) / Math.PI - 90;
                const textAnchor = (node.x + angleOffset) % (2 * Math.PI) < Math.PI ? "start" : "end";
                const rotateText = (node.x + angleOffset) % (2 * Math.PI) < Math.PI ? labelAngle : labelAngle + 180;

                return (
                  <g
                    key={i}
                    transform={`translate(${cx}, ${cy})`}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredNode(node)}
                  >
                    {/* Node Dot */}
                    <circle
                      r={isRoot ? 6 : isBranch ? 4 : 2.5}
                      fill={active ? "#5235F6" : isRoot ? "#5235F6" : "var(--foreground)"}
                      opacity={active ? 1.0 : isRoot ? 0.9 : 0.55}
                      className="transition-all duration-200"
                    />

                    {/* Label (Leaves / Branches only) */}
                    {node.depth > 0 && (
                      <g transform={`rotate(${rotateText})`}>
                        <text
                          dy="0.31em"
                          dx={textAnchor === "start" ? 8 : -8}
                          textAnchor={textAnchor}
                          className={cn(
                            "font-mono text-[9px] select-none pointer-events-none transition-all duration-300",
                            active 
                              ? "fill-[#5235F6] font-bold" 
                              : isBranch 
                              ? "fill-foreground font-semibold" 
                              : "fill-slate-400 dark:fill-zinc-500"
                          )}
                        >
                          {node.data.name}
                        </text>
                      </g>
                    )}

                    {/* Root Label in Center */}
                    {isRoot && (
                      <text
                        dy="0.31em"
                        textAnchor="middle"
                        className="font-mono text-[10px] font-bold fill-[#5235F6] select-none pointer-events-none uppercase tracking-widest"
                      >
                        {node.data.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </Container>
    </section>
  );
};

export default TechSphere;
