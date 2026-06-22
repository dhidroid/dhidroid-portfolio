import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { client } from "../../senity/senity";
import { SectionWrapper } from "../layout/SectionWrapper";
import { fadeInUp, staggerContainer } from "../../utils/motion";
import { Badge } from "../ui/Badge";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  projectDescription: string;
  image?: { asset: { url: string } };
  link?: string;
  technologies?: { title: string }[];
}

const SelectedWork = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `
          *[_type == "project"] | order(_createdAt desc)[0...3] {
            _id,
            title,
            slug,
            "projectDescription": description,
            image {
              asset->{
                url
              }
            },
            link,
            "technologies": categories[] -> {
              title
            }
          }
        `;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <SectionWrapper className="bg-background py-24">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 px-4 md:px-0">
             <div className="max-w-xl select-none">
                <div className="mb-4">
                  <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-zinc-700/50">
                    05 // RECENT PROJECTS
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tighter mb-4 text-slate-900 dark:text-white">
                  Selected Work
                </h2>
                <p className="text-slate-500 dark:text-zinc-400 text-base leading-relaxed font-body">
                  A curated selection of projects demonstrating design engineering and full-stack performance.
                </p>
             </div>
             <div>
                <Link to="/works" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary hover:gap-3 transition-all">
                  [ View All Projects ] <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
        </div>

        {/* Connected Grid - Swiss Editorial divide */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 dark:border-zinc-800 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-zinc-800 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-sm shadow-lg">
          {projects.map((project) => (
             <motion.div 
               key={project._id}
               variants={fadeInUp}
               className="group relative flex flex-col hover:bg-slate-50/50 dark:hover:bg-zinc-900/10 transition-colors duration-500"
             >
               {/* Image Area */}
               <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-slate-200 dark:border-zinc-800 bg-slate-100/50 dark:bg-zinc-950/40">
                  <div className="absolute inset-0 bg-slate-950/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  {(project as any).image?.asset?.url && (
                    <img 
                      src={(project as any).image.asset.url} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                  )}
               </div>

               {/* Content Area */}
               <div className="p-8 flex flex-col flex-grow">
                 {/* Tech Stack */}
                 <div className="flex flex-wrap gap-2 mb-6 select-none">
                   {project.technologies?.slice(0, 3).map((tech, i) => (
                     <span key={i} className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-zinc-500 border border-slate-200 dark:border-zinc-800 px-2 py-0.5 rounded">
                       {tech.title}
                     </span>
                   ))}
                 </div>
                 
                 <h3 className="text-xl md:text-2xl font-extrabold font-display uppercase tracking-tight text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors select-none">
                   {project.title}
                 </h3>
                 
                 <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-8 font-sans">
                   {project.projectDescription}
                 </p>

                 <div className="mt-auto pt-6 border-t border-slate-200 dark:border-zinc-800/60 flex items-center justify-between select-none">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 group-hover:text-primary transition-colors">[ View Case Study ]</span>
                    <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 rounded-full shadow-sm">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                 </div>

                 {/* Full Card Link Overlay */}
                  <Link 
                    to={`/works/${(project as any).slug?.current}`}
                    className="absolute inset-0 z-20"
                    aria-label={`View ${project.title}`}
                  />
               </div>
             </motion.div>
          ))}
        </div>

      </motion.div>
    </SectionWrapper>
  );
};

export default SelectedWork;
