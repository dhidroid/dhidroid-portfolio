import React from 'react'
import Button from '../ui/Button'

const FooterTailwind: React.FC = () => {
  return (
    <footer className="bg-bg-secondary text-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-2">dhidroid</h3>
          <p className="text-sm text-muted">Creating clean, usable interfaces and enjoyable frontend experiences.</p>
        </div>
        <div className="flex flex-col gap-2">
          <a className="text-sm hover:text-white" href="#projects">Projects</a>
          <a className="text-sm hover:text-white" href="#bloglist">Blog</a>
          <a className="text-sm hover:text-white" href="#contact">Contact</a>
        </div>
        <div className="flex items-center justify-end">
          <Button variant="primary">Contact me</Button>
        </div>
      </div>
    </footer>
  )
}

export default FooterTailwind
