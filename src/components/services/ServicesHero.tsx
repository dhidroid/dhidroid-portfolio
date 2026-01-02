import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { fadeInUp } from "../../utils/motion";

const ServicesHero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-white text-center px-6">
      <Container>
        <div className="flex flex-col items-center max-w-5xl mx-auto gap-12">
           
           {/* Badge */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 mb-4"
           >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Our Expertise</span>
           </motion.div>

           {/* Massive Heading */}
           <motion.h1 
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-[11vw] leading-[0.85] font-bold font-display uppercase tracking-tighter text-foreground"
           >
              CREATIVE <br />
              <span className="font-serif italic font-normal text-primary">SERVICES.</span>
           </motion.h1>

           {/* Intro Text */}
           <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-body leading-relaxed"
           >
              We provide end-to-end digital solutions, from brand strategy and visual identity to robust engineering and scaling.
           </motion.p>

        </div>
      </Container>
    </section>
  );
};

export default ServicesHero;
