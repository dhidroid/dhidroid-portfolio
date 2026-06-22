import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/motion";
import { Badge } from "../ui/Badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { D3MeshBackground } from "./D3MeshBackground";

const WorksIntro = () => {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 relative overflow-hidden bg-background border-b border-border">
      <D3MeshBackground />
      <div className="max-w-[1800px] mx-auto relative z-10">
        <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
        >
          <div className="mb-8">
            <div className="mb-4 select-none">
              <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-sm border border-slate-200/50 dark:border-zinc-700/50">
                01 // PORTFOLIO INDEX
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tighter text-slate-900 dark:text-white uppercase select-none">Selected Work</h2>
            <p className="text-slate-500 dark:text-zinc-400 mt-4 max-w-2xl font-body">A curated selection of projects demonstrating design engineering, custom interfaces, and full stack performance.</p>
            <div className="mt-6">
              <Link to="/works" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                [ View All Projects ] <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <h1 className="text-[11vw] md:text-[7.5rem] leading-[0.85] font-extrabold font-display tracking-tighter text-slate-900 dark:text-white uppercase select-none">
            Selected
            <span className="block italic font-serif font-light text-primary tracking-normal lowercase ml-[10vw] my-2 text-[10vw] md:text-[6.5rem]">works</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksIntro;
