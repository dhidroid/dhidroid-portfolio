import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/SectionWrapper";
import { fadeInUp } from "../../utils/motion";

interface ProjectGalleryProps {
  images?: { asset: { url: string } }[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <SectionWrapper className="bg-white py-0 md:py-0">
       <div className="flex flex-col gap-12 md:gap-24 mb-32">
          {images.map((img, index) => {
             // Logic: Alternating visual rhythm
             // Index 0: Full width
             // Index 1, 2: 2-column (if available) - This is a bit complex for a map loop without chunking.
             // Simple version: Full width for all, or 2-up grid.
             // Let's do a simple grid where every 3rd image is full width, others are half.
             const isFullWidth = index % 3 === 0;

             return (
               <motion.div 
                 key={index}
                 variants={fadeInUp}
                 initial="initial"
                 whileInView="animate"
                 viewport={{ once: true, margin: "-10%" }}
                 className={`relative rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 ${isFullWidth ? 'w-full aspect-video' : 'aspect-square md:aspect-[4/3]'}`}
               >
                  <img 
                    src={img.asset.url} 
                    alt={`Project visualization ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
               </motion.div>
             );
          })}
       </div>
    </SectionWrapper>
  );
};

export default ProjectGallery;
