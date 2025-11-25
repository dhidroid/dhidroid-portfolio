import React from 'react'
import { Button } from '../ui/Button'

const HeaderTailwind: React.FC = () => {
  return (
    <header className="w-full bg-bg-primary/70 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="font-bold text-lg text-white">dhidroid</div>
          <nav className="hidden md:flex gap-4 text-sm text-secondary">
            <a className="hover:text-white" href="#about">About</a>
            <a className="hover:text-white" href="#projects">Projects</a>
            <a className="hover:text-white" href="#blogs">Blogs</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Contact</Button>
          <Button variant="primary">Hire me</Button>
        </div>
      </div>
    </header>
  )
}

export default HeaderTailwind
