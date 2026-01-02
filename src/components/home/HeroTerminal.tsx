import React from 'react';

/**
 * HeroTerminal Component
 * Displays the isometric flow illustration within a MacOS-style window container.
 */

const HeroTerminal = () => {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center relative font-sans py-12">
       
       {/* Mac Window Wrapper */}
       <div className="w-full max-w-4xl bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col transition-all duration-500 hover:shadow-primary/10">
          
          {/* Window Header */}
          <div className="h-12 bg-white/50 border-b border-white/20 flex items-center px-6 gap-20">
              {/* Traffic Lights */}
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                 <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                 <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
              </div>
              
              {/* Title */}
              <div className="flex-1 text-center text-xs font-medium text-slate-500/70 -ml-12 font-mono tracking-wide">
                  DhineshKumar Portfolio — v5.0
              </div>
          </div>

          {/* Window Content - Isometric Illustration */}
          <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-white/30 to-white/10 p-8 md:p-12">
              <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
                  <img 
                    src="/images/relay-flow.png" 
                    alt="System Architecture Diagram" 
                    className="w-full h-full object-contain transform transition-transform duration-700 hover:scale-[1.02] mix-blend-multiply contrast-125"
                  />
                  
                  {/* Subtle Grid Overlay for Tech Feel */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              </div>
          </div>
          
       </div>

    </div>
  );
};

export default HeroTerminal;
