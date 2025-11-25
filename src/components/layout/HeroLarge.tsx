import React from 'react'
import { Button } from '../ui/Button'

const FloatingCard: React.FC<{ kids?: React.ReactNode; className?: string }> = ({ kids, className = '' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm p-4 shadow-2xl border border-white/20 ${className}`}>
    {kids}
  </div>
)

const HeroLarge: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0b10] via-[#0f0c1f] to-[#0a0a0f] opacity-95" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="text-6xl md:text-7xl lg:text-[5.25rem] leading-[0.95] font-extrabold text-white drop-shadow-lg tracking-tight transform-gpu animate-typo-fade">
              <div className="inline-block">Mind Matters.</div>
              <div className="inline-block mt-3 text-primary">Empowering Mind</div>
              <div className="inline-block mt-3 text-muted text-3xl md:text-4xl font-semibold">To Heal Body</div>
            </div>

            <p className="mt-6 text-lg text-secondary max-w-3xl">Digital therapeutics and thoughtfully-crafted digital products focused on wellbeing and real impact. I design and build production-ready frontends, mobile apps and backend services.</p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Button variant="secondary" size="md">Learn More</Button>
              <Button variant="primary" size="md">Get Started</Button>
            </div>
          </div>

          <div className="relative h-96 lg:h-[360px]">
            {/* subtle grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#7b47ff33] via-transparent to-transparent opacity-80" />

            <div className="absolute -left-6 -top-6 w-[420px] h-[200px] rotate-3 transform-gpu animate-float-slow">
              <FloatingCard className="w-full h-full flex flex-col justify-center items-start gap-2 p-5">
                <div className="text-sm text-muted font-medium">Bonnie Miller</div>
                <div className="text-xs text-muted">Started: Wed 27 Oct, 2026</div>
              </FloatingCard>
            </div>

            <div className="absolute right-8 top-16 w-[330px] h-[160px] -rotate-2 transform-gpu animate-float-fast">
              <FloatingCard className="w-full h-full flex flex-col justify-center items-start gap-2 p-5">
                <div className="text-sm text-muted font-medium">Simon Phillips</div>
                <div className="text-xs text-muted">Week 8 — Day 3</div>
              </FloatingCard>
            </div>

            <div className="absolute left-14 bottom-6 w-[220px] h-[100px] transform-gpu animate-float-mid">
              <FloatingCard className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">Dr. Gary Elkins</FloatingCard>
            </div>

            {/* central grid box */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[380px] h-[160px] rounded-3xl bg-gradient-to-br from-purple-600/80 to-pink-400/70 shadow-2xl border border-white/20 transform-gpu rotate-[-6deg] animate-tilt">
                <div className="flex flex-col items-start justify-center h-full p-6 text-white">
                  <div className="text-sm font-medium">Appointment</div>
                  <div className="mt-3 font-semibold text-xl">Dr. Gary Elkins</div>
                  <div className="text-xs mt-1 opacity-80">12:00 PM • 7 Oct</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* background grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30"> 
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0 H0 V80" fill="none" stroke="#ffffff10" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

    </section>
  )
}

export default HeroLarge
