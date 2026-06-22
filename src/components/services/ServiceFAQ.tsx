import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Rocket, Clock, LifeBuoy, Code, ArrowRight, MessageSquare } from "lucide-react";
import { fadeInUp, staggerContainer } from "../../utils/motion";

const faqs = [
  {
    id: "q1",
    question: "Do you work with startups?",
    category: "Ideal Clients",
    answer: "Absolutely. We love working with ambitious startups. We understand the unique challenges of building a product from scratch and can help you iterate quickly while maintaining high quality.",
    icon: Rocket
  },
  {
    id: "q2",
    question: "What is your typical timeline?",
    category: "Process",
    answer: "Timelines vary depending on the project scope. A typical branding and web project takes between 4-8 weeks. We'll provide a detailed timeline during the proposal phase.",
    icon: Clock
  },
  {
    id: "q3",
    question: "Do you provide post-launch support?",
    category: "Maintenance",
    answer: "Yes, we offer ongoing maintenance and support packages to ensure your digital product remains secure, up-to-date, and optimized for performance.",
    icon: LifeBuoy
  },
  {
    id: "q4",
    question: "What technologies do you use?",
    category: "Tech Stack",
    answer: "We specialize in modern stacks including React, Next.js, and Sanity CMS for web, and React Native for mobile. We choose the best tool for the specific job.",
    icon: Code
  }
];

const ServiceFAQ = () => {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-slate-200 dark:border-zinc-800">
        <Container className="max-w-[1800px] px-6">
            
            {/* Massive Header like Skills Page */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-24 md:mb-32 select-none"
            >
                 <motion.h1
                    variants={fadeInUp}
                    className="text-[10vw] md:text-[7rem] font-extrabold font-display uppercase leading-[0.85] tracking-tighter text-slate-900 dark:text-white mb-8"
                >
                    Common<br />
                    <span className="text-slate-400 dark:text-zinc-600">Questions</span>
                 </motion.h1>
                <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 md:items-start border-t border-slate-200 dark:border-zinc-800 pt-8">
                    <span className="font-mono text-sm uppercase tracking-widest text-slate-500 dark:text-zinc-400 md:w-48">[ FAQ INDEX ]</span>
                    <p className="max-w-xl text-xl md:text-2xl text-slate-700 dark:text-zinc-300 leading-relaxed font-light font-body">
                        Answers to the most frequent inquiries about our process, technology, and collaboration style.
                    </p>
                </motion.div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-slate-200 dark:border-zinc-800 pt-12">
                
                {/* Section Title */}
                <div className="md:col-span-3 select-none">
                    <h2 className="text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-slate-900 dark:text-white sticky top-32">
                        Inquiries
                    </h2>
                </div>

                {/* FAQ Cards Grid */}
                <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="group relative flex flex-col items-start gap-6 p-6 rounded-none border border-transparent hover:border-slate-200 dark:hover:border-zinc-800/80 transition-colors duration-300">
                             
                             {/* Icon & Category */}
                             <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 dark:text-zinc-500 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                                    <faq.icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="select-none">
                                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">
                                        {faq.category}
                                    </span>
                                    <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {faq.question}
                                    </h3>
                                </div>
                             </div>

                             {/* Answer "Card" */}
                             <div className="absolute left-0 top-full mt-4 w-full md:w-[400px] z-50 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-none">
                                    <div className="bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 p-4 flex items-center justify-between">
                                        <span className="font-bold font-display text-sm uppercase text-slate-600 dark:text-zinc-400">The Answer</span>
                                        <MessageSquare className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-slate-600 dark:text-zinc-400 leading-relaxed mb-6 text-sm">
                                            {faq.answer}
                                        </p>
                                        <button className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:underline cursor-pointer">
                                           Ask More <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                                {/* Arrow */}
                                <div className="absolute left-8 -top-2 w-4 h-4 bg-slate-50 dark:bg-zinc-950 border-t border-l border-slate-200 dark:border-zinc-800 rotate-45"></div>
                             </div>

                              <div className="md:hidden mt-2">
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                              </div>

                        </div>
                    ))}
                </div>

            </div>
        </Container>
    </section>
  );
};

export default ServiceFAQ;
