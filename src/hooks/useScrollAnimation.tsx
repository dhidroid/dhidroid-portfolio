// src/hooks/useScrollAnimation.tsx
import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
};

// Wrapper component for easy use
interface ScrollAnimationProps {
  children: ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  style?: CSSProperties;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'animate-fade-in-up',
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  style = {},
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? animation : 'opacity-0'}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
        ...style,
      }}
    >
      {children}
    </div>
  );
};