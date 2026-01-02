import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/motion";

const BlogIntro = () => {
  return (
    <section className="pt-22 pb-16 md:pt-28 md:pb-32 px-6">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
        >
          <h1 className="text-[12vw] md:text-[8rem] leading-[0.85] font-bold font-display tracking-tighter text-foreground">
            LATEST
            <span className="block italic font-serif opacity-50 ml-[5vw]">WRITINGS.</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogIntro;
