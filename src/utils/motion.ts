export const transitions = {
    duration: 0.8,
    ease: [0.19, 1, 0.22, 1] // easeOutExpo
}

export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: transitions
}

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const textReveal = {
    initial: { y: "100%" },
    animate: { y: "0%" },
    transition: { ...transitions, duration: 1 }
}
