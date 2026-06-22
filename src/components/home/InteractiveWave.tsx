import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface WaveConfig {
  points: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phaseOffset: number;
  stroke: string;
  strokeWidth: number;
  dasharray?: string;
  opacity: number;
}

export const InteractiveWave: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, easeX: -1000, easeY: -1000 });

  // Custom wave configurations for an editorial, layered tech aesthetic
  const waves: WaveConfig[] = [
    {
      points: 80,
      speed: 0.008,
      amplitude: 55,
      frequency: 0.006,
      phaseOffset: 0,
      stroke: "url(#wave-gradient-primary)",
      strokeWidth: 2,
      opacity: 0.9,
    },
    {
      points: 70,
      speed: 0.012,
      amplitude: 35,
      frequency: 0.009,
      phaseOffset: Math.PI / 3,
      stroke: "url(#wave-gradient-secondary)",
      strokeWidth: 1.5,
      opacity: 0.6,
    },
    {
      points: 90,
      speed: 0.005,
      amplitude: 20,
      frequency: 0.015,
      phaseOffset: (2 * Math.PI) / 3,
      stroke: "#111111",
      strokeWidth: 0.75,
      dasharray: "4 6",
      opacity: 0.25,
    },
  ];

  // Update size on resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleResize = () => {
      const { clientWidth, clientHeight } = containerRef.current!;
      setDimensions({
        width: clientWidth || 800,
        height: clientHeight || 400,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Tracking mouse movement relative to the container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
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
  }, []);

  // Dynamic D3 drawing loop
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    let animationId: number;
    let time = 0;

    // Line generator using D3 with beautiful curveBasis for a premium look
    const lineGenerator = d3
      .line<[number, number]>()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveBasis);

    const update = () => {
      time += 1;
      const { width, height } = dimensions;
      const centerY = height / 2;

      // Ease the mouse coordinates to make interactions smooth
      const mouse = mouseRef.current;
      if (mouse.active) {
        if (mouse.easeX === -1000) {
          mouse.easeX = mouse.x;
          mouse.easeY = mouse.y;
        } else {
          mouse.easeX += (mouse.x - mouse.easeX) * 0.08;
          mouse.easeY += (mouse.y - mouse.easeY) * 0.08;
        }
      } else {
        // Return to center when mouse leaves
        mouse.easeX += (width / 2 - mouse.easeX) * 0.05;
        mouse.easeY += (centerY - mouse.easeY) * 0.05;
      }

      // Draw each wave
      waves.forEach((wave, waveIdx) => {
        const pointsArray: [number, number][] = [];
        const step = width / (wave.points - 1);

        for (let i = 0; i < wave.points; i++) {
          const x = i * step;
          
          // Phase calculation
          const phase = time * wave.speed + wave.phaseOffset;
          
          // Base sine wave math
          let waveY = Math.sin(x * wave.frequency + phase);

          // Envelope: taper amplitude to 0 at the start and end of the screen (extremely sleek!)
          const envelope = Math.sin((i / (wave.points - 1)) * Math.PI);
          
          // Amplitude modulation based on mouse interaction
          let amplitude = wave.amplitude;
          
          if (mouse.easeX !== -1000) {
            // Distance from mouse to current point on X axis
            const distanceX = Math.abs(x - mouse.easeX);
            
            // Influence radius (280px)
            const influenceRadius = 280;
            
            if (distanceX < influenceRadius) {
              const proximityFactor = 1 - distanceX / influenceRadius; // 1 at mouse, 0 at boundary
              
              // Modulate amplitude based on mouse proximity and vertical position
              const mousePullY = (mouse.easeY - centerY) * 0.45;
              
              // Pull the wave towards the mouse vertically, and slightly increase its amplitude
              waveY += (mousePullY / amplitude) * Math.sin(proximityFactor * Math.PI) * envelope;
              amplitude += (mouse.active ? 25 : 5) * proximityFactor * envelope;
            }
          }

          const y = centerY + waveY * amplitude * envelope;
          pointsArray.push([x, y]);
        }

        // Generate SVG Path
        const pathData = lineGenerator(pointsArray) || "";

        // Update the SVG path node directly for maximum performance
        svg.select(`.wave-path-${waveIdx}`).attr("d", pathData);
      });

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto"
      style={{ minHeight: "450px" }}
    >
      {/* Background Dots Overlay - Classic Swiss Modern Grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:28px_28px] opacity-60 mix-blend-multiply" />
      
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ display: "block" }}
      >
        <defs>
          {/* Custom high-end HSL Gradients for wave stroke */}
          <linearGradient id="wave-gradient-primary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5235F6" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#8A5CFF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5235F6" stopOpacity="0.3" />
          </linearGradient>
          
          <linearGradient id="wave-gradient-secondary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#475569" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Draw paths to be updated by D3 */}
        {waves.map((wave, index) => (
          <path
            key={index}
            className={`wave-path-${index} transition-all duration-300`}
            fill="none"
            stroke={wave.stroke}
            strokeWidth={wave.strokeWidth}
            strokeDasharray={wave.dasharray}
            opacity={wave.opacity}
          />
        ))}
      </svg>
    </div>
  );
};
