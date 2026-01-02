import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AISummaryProps {
  summary?: string;
  className?: string;
  type?: 'project' | 'blog';
}

export const AISummary: React.FC<AISummaryProps> = ({ summary, className, type = 'project' }) => {
  if (!summary) return null;

  return (
    <div className={cn("p-1 rounded-2xl bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-500/20", className)}>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm relative overflow-hidden">
        {/* Decorative Background Blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative flex gap-4">
          <div className="flex-shrink-0">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                <Sparkles size={20} />
             </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
               AI Summary
               <span className="text-[10px] font-mono uppercase tracking-wider bg-black/5 text-black/60 px-2 py-0.5 rounded-full border border-black/5">Beta</span>
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
               {summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
