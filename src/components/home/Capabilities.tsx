import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Zap } from "lucide-react";
import { SectionWrapper } from "../layout/SectionWrapper";
import { fadeInUp, staggerContainer } from "../../utils/motion";

const capabilities = [
  {
    icon: Code2,
    title: "Frontend Architecture",
    description: "Building scalable, performant React applications with modern toolchains (Vite, Next.js) and clean code practices."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting intuitive interfaces with a focus on micro-interactions, accessibility, and visual hierarchy."
  },
  {
    icon: Zap,
    title: "Motion & Interactivity",
    description: "Adding life to the web through GSAP and Framer Motion, creating immersive experiences that engage users."
  }
];

const Capabilities = () => {
  return (
    <SectionWrapper className="bg-white">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div className="md:col-span-2 lg:col-span-3 mb-12">
           <motion.h2 
             variants={fadeInUp} 
             className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight mb-6"
           >
             Capabilities
           </motion.h2>
           <motion.div variants={fadeInUp} className="h-1 w-20 bg-primary" />
        </div>

        {capabilities.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/20 transition-transform duration-300">
              <item.icon className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-display">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed font-body">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Capabilities;
