import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { PortableText } from '@portabletext/react';

interface ProjectTabsProps {
  overview?: string;
  challenge?: string;
  results?: string;
  solution?: any[]; // PortableText
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ 
  overview, 
  challenge, 
  results, 
  solution 
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", content: overview },
    { id: "challenge", label: "The Challenge", content: challenge },
    { id: "solution", label: "Our Solution", content: solution, isRich: true },
    { id: "results", label: "The Results", content: results },
  ].filter(tab => tab.content); // Only show tabs with content

  if (tabs.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Sticky Navigation (Left) */}
          <div className="lg:w-1/3">
             <div className="sticky top-32 flex flex-col gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Chapter</h3>
                {tabs.map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={cn(
                       "text-left py-4 px-6 rounded-2xl text-xl font-medium transition-all duration-300 border border-transparent",
                       activeTab === tab.id 
                         ? "bg-black text-white shadow-lg" 
                         : "text-gray-400 hover:text-black hover:bg-gray-50"
                     )}
                   >
                      {tab.label}
                   </button>
                ))}
             </div>
          </div>

          {/* Content Panel (Right) */}
          <div className="lg:w-2/3 min-h-[400px]">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                   {tabs.map((tab) => {
                      if (tab.id !== activeTab) return null;

                      return (
                        <div key={tab.id}>
                           <h2 className="text-4xl md:text-5xl font-bold font-display mb-10 leading-tight">
                              {tab.label}
                           </h2>
                           
                           <div className="prose prose-lg md:prose-xl prose-headings:font-display prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed text-gray-600">
                              {tab.isRich ? (
                                 <PortableText value={tab.content as any} />
                              ) : (
                                 <p className="whitespace-pre-wrap">{tab.content as string}</p>
                              )}
                           </div>
                        </div>
                      );
                   })}
                </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectTabs;
