import React from "react";
import { Container } from "../ui/Container";

interface ProjectContentProps {
  overview?: string;
  challenge?: string;
  results?: string;
  link?: string;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ 
    overview, 
    challenge,
    results,
    link 
}) => {
  return (
    <section className="py-24 bg-white">
      <Container className="max-w-[1400px]">
        
        {/* Overview / Brief */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 align-start mb-32">
           <div className="lg:col-span-4 sticky top-32 self-start">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">The Brief</h2>
              <div className="h-0.5 w-12 bg-black mb-6" />
           </div>
           <div className="lg:col-span-8">
              <p className="text-2xl md:text-3xl font-display leading-tight text-gray-900">
                 {overview || "No overview provided."}
              </p>
              
              {link && (
                 <div className="mt-12">
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-primary transition-colors duration-300"
                    >
                      Visit Live Site
                    </a>
                 </div>
              )}
           </div>
        </div>

        {/* Challenge Section */}
        {challenge && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 align-start mb-32">
                <div className="lg:col-span-4 sticky top-32 self-start">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">The Challenge</h2>
                    <div className="h-0.5 w-12 bg-black mb-6" />
                </div>
                <div className="lg:col-span-8">
                    <p className="text-xl md:text-xl leading-relaxed text-gray-600 font-body">
                        {challenge}
                    </p>
                </div>
            </div>
        )}

        {/* Results Section - Dark Mode Block */}
        {results && (
            <div className="rounded-3xl bg-gray-900 text-white p-8 md:p-16 lg:p-24 mt-24">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                     <div className="lg:col-span-4">
                        <h2 className="text-3xl font-bold font-display text-white mb-2">Outcome</h2>
                        <span className="text-gray-500 font-mono">2024</span>
                     </div>
                     <div className="lg:col-span-8">
                        <p className="text-2xl md:text-3xl leading-relaxed font-light text-gray-200">
                           {results}
                        </p>
                     </div>
                 </div>
            </div>
        )}

      </Container>
    </section>
  );
};

export default ProjectContent;
