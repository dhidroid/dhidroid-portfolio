import React, { useEffect, useRef, useState } from "react";
import { 
  FaReact, FaNodeJs, FaDocker, FaGithub, FaAndroid, FaSwift, FaHtml5, FaCss3Alt, FaGitAlt 
} from "react-icons/fa";
import { 
  SiTypescript, SiJavascript, SiGo, SiPostgresql, SiPrisma, SiFirebase, SiMongodb, SiTailwindcss, SiNextdotjs, SiGraphql 
} from "react-icons/si";
import { Container } from "../ui/Container";

const icons = [
  { icon: <FaReact />, color: "#61DAFB", name: "React" },
  { icon: <SiTypescript />, color: "#3178C6", name: "TypeScript" },
  { icon: <SiJavascript />, color: "#F7DF1E", name: "JavaScript" },
  { icon: <FaNodeJs />, color: "#339933", name: "Node.js" },
  { icon: <SiGo />, color: "#00ADD8", name: "Go" },
  { icon: <SiPostgresql />, color: "#4169E1", name: "PostgreSQL" },
  { icon: <SiPrisma />, color: "#2D3748", name: "Prisma" },
  { icon: <FaDocker />, color: "#2496ED", name: "Docker" },
  { icon: <FaGithub />, color: "#181717", name: "GitHub" },
  { icon: <FaAndroid />, color: "#3DDC84", name: "Android" },
  { icon: <FaSwift />, color: "#F05138", name: "Swift" },
  { icon: <SiFirebase />, color: "#FFCA28", name: "Firebase" },
  { icon: <SiTailwindcss />, color: "#06B6D4", name: "Tailwind" },
  { icon: <SiNextdotjs />, color: "#000000", name: "Next.js" },
  { icon: <SiGraphql />, color: "#E10098", name: "GraphQL" },
  { icon: <FaHtml5 />, color: "#E34F26", name: "HTML5" },
  { icon: <FaCss3Alt />, color: "#1572B6", name: "CSS3" },
  { icon: <SiMongodb />, color: "#47A248", name: "MongoDB" },
  { icon: <FaGitAlt />, color: "#F05032", name: "Git" },
];

interface Point {
  icon: React.ReactNode;
  color: string;
  name: string;
  x: number;
  y: number;
  z: number;
  phi: number;
  theta: number;
}

const TechSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const animationRef = useRef<number>();
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Distribute points on a sphere
    const newPoints = icons.map((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / icons.length);
      const theta = Math.sqrt(icons.length * Math.PI) * phi;
      
      return {
        ...item,
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        phi,
        theta
      };
    });
    setPoints(newPoints);
  }, []);

  useEffect(() => {
    const animate = () => {
      rotationRef.current.x += 0.005;
      rotationRef.current.y += 0.005;
      
      setPoints(prevPoints => prevPoints.map(point => {
         // Rotate around Y axis
         const x = point.x * Math.cos(0.005) - point.z * Math.sin(0.005);
         let z = point.x * Math.sin(0.005) + point.z * Math.cos(0.005);
         
         // Rotate around X axis (optional/minimal)
         const y = point.y * Math.cos(0.002) - z * Math.sin(0.002);
         z = point.y * Math.sin(0.002) + z * Math.cos(0.002);

         return { ...point, x, y, z };
      }));
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="py-20 min-h-[600px] overflow-hidden bg-white">
      <Container>
        <div className="flex flex-col items-center mb-12">
           <h2 className="text-4xl font-bold mb-4 font-display">Technical Expertise</h2>
           <p className="text-gray-500 text-center max-w-2xl">
             A dynamic ecosystem of tools and technologies I use to build scalable solutions.
           </p>
        </div>

        <div 
          ref={containerRef} 
          className="relative w-full max-w-[500px] h-[500px] mx-auto perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {points.map((point, index) => {
            // Project 3D to 2D
            // Radius of sphere in pixels
            const radius = 220;
            const screenX = point.x * radius;
            const screenY = point.y * radius;
            // Scale based on Z (depth)
            const scale = (point.z + 2) / 3; // Normalize z (-1 to 1) to a scale factor
            const opacity = (point.z + 1.5) / 2.5; 
            const isBack = point.z < 0;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center pointer-events-none"
                style={{
                  transform: `translate3d(${screenX}px, ${screenY}px, ${point.z * 100}px) scale(${scale})`,
                  opacity: Math.max(0.2, Math.min(1, opacity)),
                  zIndex: Math.floor(point.z * 100),
                  filter: isBack ? 'blur(2px)' : 'none',
                  color: point.color
                }}
              >
                <div className="text-5xl drop-shadow-lg transition-colors p-2 bg-white/50 backdrop-blur-sm rounded-full">
                   {point.icon}
                </div>
                <span className="text-xs font-bold text-gray-800 bg-white/80 px-2 py-0.5 rounded mt-1 shadow-sm whitespace-nowrap">
                  {point.name}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TechSphere;
