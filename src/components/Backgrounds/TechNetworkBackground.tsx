import React, { useEffect, useRef } from 'react';

const icons = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
];

const TechNetworkBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        // Preload images
        imagesRef.current = icons.map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            img: HTMLImageElement;

            constructor(w: number, h: number, img: HTMLImageElement) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 20 + 20; // 20-40px
                this.img = img;
            }

            update(w: number, h: number) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.globalAlpha = 0.8;
                ctx.drawImage(this.img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            const count = Math.min(20, (canvas.width * canvas.height) / 20000); // Density
            for (let i = 0; i < count; i++) {
                const img = imagesRef.current[i % imagesRef.current.length];
                particles.push(new Particle(canvas.width, canvas.height, img));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections first
            ctx.globalAlpha = 0.15;
            ctx.strokeStyle = '#5315FC';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 200) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(p => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', init);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
        />
    );
};

export default TechNetworkBackground;
