import React, { useRef, useEffect } from 'react';

type Variant = 'lines' | 'grid' | 'radar' | 'database' | 'flow' | 'network' | 'chart';

interface CanvasArtProps {
  variant: Variant;
  className?: string;
  color?: string;
}

const CanvasArt: React.FC<CanvasArtProps> = ({ variant, className, color = 'rgba(255,255,255,0.2)' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Clear
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (variant === 'lines') {
      // Abstract geometric lines
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h);
      ctx.lineTo(w * 0.5, h * 0.4);
      ctx.lineTo(w * 0.8, h);
      ctx.moveTo(w * 0.3, h);
      ctx.lineTo(w * 0.5, h * 0.6);
      ctx.lineTo(w * 0.7, h);
      ctx.moveTo(0, h * 0.8);
      ctx.lineTo(w, h * 0.2);
      ctx.stroke();

    } else if (variant === 'grid') {
      // Topographic Grid
      ctx.beginPath();
      const step = 20;
      for (let y = h * 0.3; y < h; y += step) {
         ctx.moveTo(0, y);
         ctx.bezierCurveTo(w * 0.3, y - 20, w * 0.7, y + 20, w, y);
      }
      for (let x = 0; x < w; x += step) {
         ctx.moveTo(x, h * 0.3);
         ctx.lineTo(x, h);
      }
      ctx.stroke();

    } else if (variant === 'radar') {
       // Radar/Concentric Arcs
       ctx.beginPath();
       const cx = w;
       const cy = h;
       const maxR = Math.min(w, h) * 1.5;
       for (let r = 20; r < maxR; r += 20) {
           ctx.moveTo(cx, cy);
           ctx.arc(cx, cy, r, Math.PI, 1.5 * Math.PI);
       }
       ctx.stroke();

    } else if (variant === 'database') {
        // Cylinder / Stack
        const cx = w / 2;
        const cy = h / 2;
        const rw = w * 0.4;
        const rh = h * 0.15;
        
        ctx.beginPath();
        // Top ellipse
        ctx.ellipse(cx, cy - h*0.2, rw, rh, 0, 0, 2 * Math.PI);
        // Middle ellipse
        ctx.moveTo(cx + rw, cy - h*0.2);
        ctx.lineTo(cx + rw, cy + h*0.2);
        ctx.ellipse(cx, cy + h*0.2, rw, rh, 0, 0, Math.PI);
        ctx.lineTo(cx - rw, cy - h*0.2);
        
        // Internal line
        ctx.moveTo(cx - rw, cy);
        ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI);
        ctx.stroke();

    } else if (variant === 'flow') {
        // Diverging Flow (Tree)
        const startX = w * 0.1;
        const startY = h / 2;
        const endX = w * 0.9;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(w * 0.3, startY);
        
        // Branches
        [0.2, 0.4, 0.5, 0.6, 0.8].forEach(factor => {
            ctx.moveTo(w * 0.3, startY);
            ctx.bezierCurveTo(w * 0.5, startY, w * 0.5, h * factor, endX, h * factor);
        });
        ctx.stroke();

    } else if (variant === 'network') {
        // Hub and Spoke / Radial
        const cx = w / 2;
        const cy = h / 2;
        const rSmall = 20;
        const rLarge = Math.min(w, h) * 0.35;
        
        ctx.beginPath();
        // Center
        ctx.rect(cx - 15, cy - 15, 30, 30);
        
        // Spokes
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * 2 * Math.PI;
            const sx = cx + Math.cos(angle) * 30; // Start a bit out
            const sy = cy + Math.sin(angle) * 30;
            const ex = cx + Math.cos(angle) * rLarge;
            const ey = cy + Math.sin(angle) * rLarge;
            
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            
            // Node at end
            ctx.moveTo(ex + 3, ey);
            ctx.arc(ex, ey, 3, 0, 2 * Math.PI);
        }
        ctx.stroke();

    } else if (variant === 'chart') {
        // Flowchart / Nodes
        ctx.beginPath();
        // Main Node
        ctx.rect(w * 0.1, h * 0.4, 40, 40);
        
        // Branching arrows
        const startX = w * 0.1 + 40;
        const startY = h * 0.4 + 20;
        
        // Top branch
        ctx.moveTo(startX, startY);
        ctx.lineTo(w * 0.5, h * 0.3);
        ctx.lineTo(w * 0.7, h * 0.3);
        ctx.rect(w * 0.7, h * 0.3 - 15, 30, 30);
        
        // Mid branch
        ctx.moveTo(startX, startY);
        ctx.lineTo(w * 0.7, startY);
        ctx.rect(w * 0.7, startY - 15, 30, 30);
        
        // Bot branch
        ctx.moveTo(startX, startY);
        ctx.lineTo(w * 0.5, h * 0.7);
        ctx.lineTo(w * 0.7, h * 0.7);
        ctx.rect(w * 0.7, h * 0.7 - 15, 30, 30);
        
        ctx.stroke();
    }
  }, [variant, color]);

  return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%' }} />;
};

export default CanvasArt;
