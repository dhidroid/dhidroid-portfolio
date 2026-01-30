import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/motion";
import { Badge } from "../ui/Badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const WorksIntro = () => {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
        >
          <div className="mb-8">
            <Badge className="mb-4">Portfolio</Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-foreground">Selected Work</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">A curated selection of projects demonstrating design engineering and performance.</p>
            <div className="mt-6">
              <Link to="/works" className="inline-flex items-center gap-2 font-medium text-primary">
                View All Projects <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <h1 className="text-[12vw] md:text-[8rem] leading-[0.85] font-bold font-display tracking-tighter text-foreground">
            SELECTED
            <span className="block italic font-serif opacity-50 ml-[5vw]">WORKS.</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksIntro;
