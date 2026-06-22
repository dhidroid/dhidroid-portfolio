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
    <SectionWrapper className="bg-background border-t border-slate-200 dark:border-zinc-800">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="mb-4">
            <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-zinc-700/50">
              03 // EXPERIENCE TIMELINE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tighter mb-6 text-slate-900 dark:text-white">
            {title}
          </h2>
          <div className="text-lg text-slate-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-body">
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
