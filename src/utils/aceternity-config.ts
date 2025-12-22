// Global Motion Configuration for Aceternity UI Components
// Ensures consistent animation behavior across the application.

export const TRANSITION = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export const HOVER_SCALE = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

export const STAGGER_CHILDREN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
