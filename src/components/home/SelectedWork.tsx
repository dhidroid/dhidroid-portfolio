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
             <div className="max-w-xl">
               <Badge className="mb-6 rounded-none">Portfolio</Badge>
               <motion.h2 
                 variants={fadeInUp} 
                 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4 text-foreground"
               >
                 Selected Work
               </motion.h2>
               <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed font-sans">
                 A curated selection of projects demonstrating design engineering and performance.
               </motion.p>
             </div>
             <motion.div variants={fadeInUp}>
               <Link to="/works" className="inline-flex items-center gap-2 font-medium text-primary hover:gap-3 transition-all">
                 View All Projects <ArrowRight className="w-5 h-5" />
               </Link>
             </motion.div>
        </div>

        {/* Connected Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-card">
          {projects.map((project) => (
             <motion.div 
               key={project._id}
               variants={fadeInUp}
               className="group relative flex flex-col hover:bg-muted/5 transition-colors duration-500"
             >
               {/* Image Area */}
               <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/60 bg-muted/20">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
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
                 <div className="flex flex-wrap gap-2 mb-6">
                   {project.technologies?.slice(0, 3).map((tech, i) => (
                     <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border/60 px-2 py-1">
                       {tech.title}
                     </span>
                   ))}
                 </div>
                 
                 <h3 className="text-2xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">
                   {project.title}
                 </h3>
                 
                 <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-8 font-sans">
                   {project.projectDescription}
                 </p>

                 <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">View Case Study</span>
                    <div className="w-10 h-10 flex items-center justify-center bg-muted/10 text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
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
