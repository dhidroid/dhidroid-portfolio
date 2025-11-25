import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
}

const baseClass = 'inline-flex items-center justify-center rounded-md font-semibold transition-transform duration-150'

const variantMap: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:opacity-90 shadow-lg',
  secondary: 'bg-surface text-white border border-border-medium hover:bg-card',
  ghost: 'bg-transparent text-secondary hover:text-primary',
}

const sizeMap = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  const cls = `${baseClass} ${variantMap[variant]} ${sizeMap[size]} ${className}`
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}

export default Button
