import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { fadeInUp } from "../../utils/motion";

const AboutHero = () => {
    return (
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-background text-center px-6">
            <Container>
                <div className="flex flex-col items-center max-w-5xl mx-auto gap-12">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800/80 mb-4"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400">About Me</span>
                    </motion.div>

                    {/* Massive Heading */}
                    <motion.h1
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                        className="text-[8vw] md:text-[6.5vw] leading-[0.9] font-extrabold font-display uppercase tracking-tighter text-slate-900 dark:text-white mb-6"
                    >
                        DHINESH <span className="text-slate-400 dark:text-zinc-600">KUMAR</span> <br />
                        <span className="font-serif italic font-normal text-primary text-[5vw] md:text-[3.5vw] lowercase tracking-normal">software engineer & mobile specialist</span>
                    </motion.h1>

                    {/* Intro Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto font-body leading-relaxed"
                    >
                        I am a passionate Software Engineer and Mobile App Specialist based in Chennai, specializing in React Native, Go, and Cloud Ecosystems. With a deep-rooted belief in open-source philosophy, I build tools and frameworks that empower developers and users alike.
                    </motion.p>

                </div>
            </Container>
        </section>
    );
};

export default AboutHero;
