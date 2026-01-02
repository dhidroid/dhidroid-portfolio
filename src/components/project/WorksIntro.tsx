import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/motion";

const WorksIntro = () => {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
        >
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
