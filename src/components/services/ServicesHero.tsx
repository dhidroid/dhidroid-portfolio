import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { fadeInUp } from "../../utils/motion";

const ServicesHero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-background text-center px-6">
      <Container>
        <div className="flex flex-col items-center max-w-5xl mx-auto gap-12">
           
           {/* Badge */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800/80 mb-4"
           >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400">Our Expertise</span>
           </motion.div>

           {/* Massive Heading */}
           <motion.h1 
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-[9vw] leading-[0.85] font-extrabold font-display uppercase tracking-tighter text-slate-900 dark:text-white"
           >
              CREATIVE <br />
              <span className="font-serif italic font-normal text-primary lowercase tracking-normal">capabilities</span>
           </motion.h1>

           {/* Intro Text */}
           <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto font-body leading-relaxed"
           >
              We provide end-to-end digital solutions, from brand strategy and visual identity to robust engineering and scaling.
           </motion.p>

        </div>
      </Container>
    </section>
  );
};

export default ServicesHero;
