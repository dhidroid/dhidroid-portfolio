import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface D3ProjectNetworkProps {
  projectTitle: string;
  tags?: string[];
}

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
  details?: string;
  size: number;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  value: number;
}

export const D3ProjectNetwork: React.FC<D3ProjectNetworkProps> = ({
  projectTitle,
  tags = ["TypeScript", "React", "Node.js", "AWS"]
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      const { clientWidth } = containerRef.current!;
      setDimensions({
        width: clientWidth || 800,
        height: 400
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const { width, height } = dimensions;

    // Define Nodes and Links based on project tags
    const nodes: NetworkNode[] = [
      { id: "root", group: 0, label: projectTitle.toUpperCase(), size: 10, details: "Core Architecture root node" },
      { id: "frontend", group: 1, label: "FRONTEND LAYER", size: 7, details: "UI / Client Interfaces" },
      { id: "backend", group: 2, label: "BACKEND INFRA", size: 7, details: "Server & API Endpoints" },
      { id: "data", group: 3, label: "DATA & STORAGE", size: 7, details: "Database & caching layers" }
    ];

    const links: NetworkLink[] = [
      { source: "root", target: "frontend", value: 2 },
      { source: "root", target: "backend", value: 2 },
      { source: "root", target: "data", value: 2 }
    ];

    // Map tag strings to stack groups
    tags.forEach((tag, idx) => {
      const lower = tag.toLowerCase();
      let targetGroup = 1;
      let targetNode = "frontend";
      let details = "UI engineering module";

      if (lower.includes("node") || lower.includes("go") || lower.includes("python") || lower.includes("aws") || lower.includes("docker") || lower.includes("server")) {
        targetGroup = 2;
        targetNode = "backend";
        details = "Microservice & cloud delivery infrastructure";
      } else if (lower.includes("sql") || lower.includes("db") || lower.includes("mongo") || lower.includes("caching") || lower.includes("storage")) {
        targetGroup = 3;
        targetNode = "data";
        details = "Stateful storage system database";
      }

      const nodeId = `tag-${idx}`;
      nodes.push({ id: nodeId, group: targetGroup, label: tag.toUpperCase(), size: 5, details });
      links.push({ source: targetNode, target: nodeId, value: 1 });
    });

    // Clear previous elements
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    // Create D3 Force Simulation
    const simulation = d3.forceSimulation<NetworkNode>(nodes)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(links).id(d => d.id).distance(75))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => d.size * 5));

    // Draw Links
    const link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "var(--border)")
      .attr("stroke-width", d => d.value * 0.75)
      .attr("stroke-dasharray", d => d.value === 1 ? "2 2" : "none")
      .attr("opacity", 0.6);

    // Draw Nodes Group
    const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    // Node Circles
    node.append("circle")
      .attr("r", d => d.size)
      .attr("fill", d => {
        if (d.group === 0) return "#5235F6"; // Root
        if (d.group === 1) return "var(--foreground)";
        if (d.group === 2) return "#5235F6";
        return "var(--foreground)";
      })
      .attr("stroke", "var(--background)")
      .attr("stroke-width", 1.5)
      .on("mouseover", (event, d) => {
        setSelectedNode(d);
        d3.select(event.currentTarget).transition().attr("r", d.size * 1.3).attr("fill", "#5235F6");
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget).transition().attr("r", d.size).attr("fill", d.group === 0 ? "#5235F6" : d.group === 2 ? "#5235F6" : "var(--foreground)");
      });

    // Node Labels
    node.append("text")
      .attr("dx", d => d.size + 4)
      .attr("dy", ".31em")
      .attr("font-family", "monospace")
      .attr("font-size", d => d.group === 0 ? "10px" : "8px")
      .attr("font-weight", d => d.group === 0 ? "bold" : "normal")
      .attr("fill", "var(--foreground)")
      .attr("opacity", 0.75)
      .text(d => d.label);

    // Physics ticks
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Drag handlers
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [dimensions, projectTitle, tags]);

  return (
    <div ref={containerRef} className="relative w-full border border-border rounded-sm bg-white/20 dark:bg-zinc-950/20 overflow-hidden font-mono select-none">
      
      {/* Telemetry Index header */}
      <div className="flex justify-between items-center px-4 py-2.5 border-b border-border bg-slate-100/50 dark:bg-zinc-900/50 text-[10px] tracking-widest text-slate-400 dark:text-zinc-500">
        <span>[ SYSTEM ARCHITECTURE TOPOLOGY D3 ]</span>
        <div className="flex gap-4">
          <span>DRAG NODES TO DISTORT</span>
          <span className="animate-pulse text-[#5235F6]">● SOLVED DEPS</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border">
        
        {/* SVG Force Layout */}
        <div className="lg:col-span-3 h-[400px]">
          <svg ref={svgRef} width={dimensions.width} height={400} className="block w-full h-full" />
        </div>

        {/* Telemetry Info Panel */}
        <div className="lg:col-span-1 p-6 flex flex-col justify-between text-xs space-y-4">
          <div className="space-y-4">
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-widest block">[ TELEMETRY NODE DATA ]</span>
            {selectedNode ? (
              <div className="space-y-2">
                <div className="border-b border-dashed border-border pb-1">
                  <span className="text-slate-400">ID:</span> <span className="font-bold text-foreground">{selectedNode.label}</span>
                </div>
                <div className="border-b border-dashed border-border pb-1">
                  <span className="text-slate-400">LAYER:</span> <span className="font-bold text-[#5235F6]">{selectedNode.group === 0 ? "ROOT" : selectedNode.group === 1 ? "CLIENT LAYER" : selectedNode.group === 2 ? "SERVICE LAYER" : "DATA STORE"}</span>
                </div>
                <div className="leading-relaxed text-slate-500 dark:text-zinc-400 mt-2 italic">
                  {selectedNode.details}
                </div>
              </div>
            ) : (
              <div className="text-slate-400 dark:text-zinc-600 italic">
                Hover over a node to read stack properties.
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 text-[10px] text-slate-400 space-y-1">
            <div>MEM LEVEL: STABLE</div>
            <div>CONN: HIGH VELOCITY</div>
          </div>
        </div>

      </div>

    </div>
  );
};
