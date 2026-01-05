import React from 'react';
import { cn } from '../../utils/cn';

interface IconContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'ghost' | 'filled';
  className?: string;
  animate?: boolean;
}

export const IconContainer: React.FC<IconContainerProps> = ({
  children,
  size = 'md',
  variant = 'outline',
  className,
  animate = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-12 h-12 p-2.5',
    lg: 'w-16 h-16 p-4',
    xl: 'w-20 h-20 p-5',
  };

  const variantClasses = {
    outline: 'border border-black/10 bg-white/50 backdrop-blur-sm',
    ghost: 'bg-transparent',
    filled: 'bg-primary/5 border border-primary/10',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-none transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        animate && 'group-hover:scale-105 group-hover:border-primary/20 group-hover:bg-white',
        className
      )}
    >
      {React.cloneElement(children as React.ReactElement, {
        className: cn(
          'w-full h-full text-foreground/70 group-hover:text-primary transition-colors duration-300',
          (children as React.ReactElement).props.className
        ),
      })}
    </div>
  );
};
