import React, { useEffect, useRef } from 'react';

interface DotMatrixBackgroundProps {
    className?: string;
}

const DotMatrixBackground: React.FC<DotMatrixBackgroundProps> = ({ className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle resize
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            canvas.width = innerWidth;
            canvas.height = innerHeight;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Handle mouse move
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation settings
        const DOT_SPACING = 40;
        const DOT_RADIUS = 2;
        const INTERACTION_RADIUS = 150;
        const WAVE_SPEED = 0.02;
        const WAVE_AMPLITUDE = 15;
        
        let animationFrame: number;
        let time = 0;

        class Dot {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            currentRadius: number;

            constructor(x: number, y: number) {
                this.baseX = x;
                this.baseY = y;
                this.x = x;
                this.y = y;
                this.currentRadius = DOT_RADIUS;
            }

            update(mouseX: number, mouseY: number, t: number) {
                // Wave effect
                const waveOffset = Math.sin(this.baseX * 0.01 + t) * Math.cos(this.baseY * 0.01 + t) * WAVE_AMPLITUDE;
                
                // Mouse interaction
                const dx = mouseX - this.baseX;
                const dy = mouseY - this.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < INTERACTION_RADIUS) {
                    const force = (INTERACTION_RADIUS - distance) / INTERACTION_RADIUS;
                    const angle = Math.atan2(dy, dx);
                    this.x = this.baseX - Math.cos(angle) * force * 30;
                    this.y = this.baseY - Math.sin(angle) * force * 30;
                    this.currentRadius = DOT_RADIUS + force * 4;
                } else {
                    // Return to base position with wave
                    this.x += (this.baseX - this.x + waveOffset * 0.1) * 0.1;
                    this.y += (this.baseY - this.y + waveOffset * 0.1) * 0.1;
                    this.currentRadius += (DOT_RADIUS - this.currentRadius) * 0.1;
                }
            }

            draw(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Gradient based on distance from mouse
                let alpha = 0.3;
                if (distance < INTERACTION_RADIUS) {
                    alpha = 0.3 + (1 - distance / INTERACTION_RADIUS) * 0.7;
                }

                // Color gradient from brand color to purple
                const hue = 250 + (distance / INTERACTION_RADIUS) * 30;
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
                
                // Create gradient
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.currentRadius * 3
                );
                gradient.addColorStop(0, `hsla(${hue}, 100%, 65%, ${alpha})`);
                gradient.addColorStop(1, `hsla(${hue}, 100%, 65%, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.fill();

                // Inner glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.currentRadius * 0.7, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
                ctx.fill();
            }
        }

        // Create dots grid
        const dots: Dot[] = [];
        const cols = Math.ceil(canvas.width / DOT_SPACING) + 1;
        const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * DOT_SPACING;
                const y = j * DOT_SPACING;
                dots.push(new Dot(x, y));
            }
        }

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const { x: mouseX, y: mouseY } = mouseRef.current;
            time += WAVE_SPEED;

            // Draw connections between nearby dots
            ctx.strokeStyle = 'rgba(83, 21, 252, 0.1)';
            ctx.lineWidth = 1;

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                dot.update(mouseX, mouseY, time);

                // Draw connections
                for (let j = i + 1; j < dots.length; j++) {
                    const other = dots[j];
                    const dx = dot.x - other.x;
                    const dy = dot.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < DOT_SPACING * 1.5) {
                        const alpha = 1 - distance / (DOT_SPACING * 1.5);
                        ctx.strokeStyle = `rgba(83, 21, 252, ${alpha * 0.15})`;
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }

                dot.draw(ctx, mouseX, mouseY);
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default DotMatrixBackground;
