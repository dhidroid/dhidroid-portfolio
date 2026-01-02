import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";

const GlobalCursor = () => {
    const { scrollYProgress } = useScroll();
    const [percent, setPercent] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Mouse position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth physics
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if we are in Header or Footer -> Hide Custom Cursor
            if (target.closest('header') || target.closest('footer')) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Check if we are hovering a clickable element -> Scale Up Dot
            if (target.tagName.toLowerCase() === 'a' || 
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button') {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);

        const unsubscribeScroll = scrollYProgress.onChange((latest) => {
            setPercent(Math.round(latest * 100));
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            unsubscribeScroll();
        };
    }, [cursorX, cursorY, scrollYProgress]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center gap-3"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                pointerEvents: 'none'
            }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* The Dot Cursor */}
            <motion.div
                layout
                className="bg-white rounded-full flex items-center justify-center"
                animate={{
                    width: hovered ? 48 : 12,
                    height: hovered ? 48 : 12,
                    opacity: hovered ? 0.3 : 1
                 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />

            {/* The Text Label (Scroll %) - Hides on hover to keep focus on the action */}
            <motion.span 
                animate={{ opacity: hovered ? 0 : 1, x: hovered ? 20 : 0 }}
                className="text-sm font-display font-bold text-white tracking-widest leading-none whitespace-nowrap"
            >
                {percent < 10 ? `0${percent}` : percent}%
            </motion.span>
        </motion.div>
    );
};

export default GlobalCursor;
