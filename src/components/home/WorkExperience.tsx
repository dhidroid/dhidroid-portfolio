import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/SectionWrapper";
import { PortfolioContent } from "../../utils/Data/portfolioContent";
import { fadeInUp, staggerContainer } from "../../utils/motion";
import ExperienceCard from "../about/ExperienceCard";

export interface ExperienceItem {
  id?: string | number;
  company: string;
  role: string;
  period: string;
  location?: string;
  achievements?: string[];
  tags?: string[];
}

interface WorkExperienceProps {
  experiences?: ExperienceItem[];
  title?: string;
  subtitle?: React.ReactNode;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ 
    experiences,
    title = "Experience",
  subtitle
}) => {
    const displayData: ExperienceItem[] = experiences || PortfolioContent.experience.map(exp => ({
        id: exp.id,
        company: exp.company,
        role: exp.role,
        period: exp.period,
        achievements: exp.achievements,
      tags: [] 
    }));

  return (
    <SectionWrapper className="bg-white">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight mb-6 text-slate-900">
            {title}
          </h2>
          <div className="h-1 w-20 bg-primary mb-6" />
          <div className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            {subtitle || "A timeline of my professional journey and the companies I've helped build."}
          </div>
        </motion.div>

        {/* Grid Layout replacing Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayData.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
            >
                <ExperienceCard item={exp} index={index} />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default WorkExperience;
