import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-bg-card border border-border-light rounded-lg p-6 shadow-md ${className}`}>
      {children}
    </div>
  )
}

export default Card
