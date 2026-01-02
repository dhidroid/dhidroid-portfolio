import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

const NewHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-50/50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Typography */}
          <div className="max-w-2xl relative z-10">
            {/* Header/Eyebrow */}
            <div className="flex items-center gap-4 mb-8 text-sm font-medium text-gray-500">
               <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Available for work
               </span>
               <span>Based in India, working worldwide</span>
            </div>

            <div className="mb-2 text-sm font-bold tracking-widest text-gray-400 uppercase">
              Save time and money.
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 leading-[0.95] mb-8">
              Optimize, <br />
              <span className="text-slate-900">Outperform</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-md">
              Elevate your digital presence with high-performance web applications and automated workflows.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="rounded-full px-8 h-14 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                View Projects 
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 border-gray-200 hover:border-gray-300 bg-white text-slate-900 font-medium hover:bg-gray-50">
                Contact Me
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Composition (Hand holding Phone Mockup) */}
          <div className="relative z-0 mt-12 lg:mt-0 flex justify-center lg:justify-end perspective-1000">
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
             
             {/* Abstract Phone/Dashboard Composition */}
             <div className="relative w-[300px] md:w-[360px] aspect-[9/16] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl transform rotate-[-6deg] hover:rotate-0 transition-transform duration-700 ease-out overflow-hidden">
                {/* Screen Content */}
                <div className="absolute inset-0 bg-white overflow-hidden">
                    {/* Header */}
                    <div className="h-20 bg-gray-50 p-6 flex justify-between items-center border-b border-gray-100">
                        <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-8 w-8 bg-primary/20 rounded-full" />
                    </div>
                    {/* Chart Area */}
                    <div className="p-6 space-y-6">
                        <div className="h-32 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 p-4 relative overflow-hidden">
                            {/* Line Chart curve */}
                            <svg className="absolute bottom-0 left-0 w-full h-20 text-primary" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <path d="M0 40 L0 20 Q 20 5, 40 25 T 80 20 T 100 5 V 40 Z" fill="currentColor" fillOpacity="0.2" />
                                <path d="M0 20 Q 20 5, 40 25 T 80 20 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                        
                        {/* List Items */}
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-100" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
                                    <div className="h-2 w-1/3 bg-gray-50 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Bottom Floating Action */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-primary/30">
                            Scan & Analyze
                        </div>
                    </div>
                </div>
             </div>

             {/* "Hand" visual implication - skipped for CSS simplicity, using floating effect instead */}
             {/* Floating Badge */}
             <div className="absolute bottom-20 -left-12 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-float-slow">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                        <PlayCircle size={20} />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 font-medium">Efficiency</div>
                        <div className="text-lg font-bold text-slate-900">+124%</div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewHero;
