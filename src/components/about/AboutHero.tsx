import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { fadeInUp } from "../../utils/motion";

const AboutHero = () => {
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
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">About Me</span>
                    </motion.div>

                    {/* Massive Heading */}
                    <motion.h1
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                        className="text-[8vw] md:text-[6vw] leading-[0.9] font-bold font-display uppercase tracking-tighter text-foreground mb-6"
                    >
                        DHINESH <span className="text-gray-400">KUMAR</span> <br />
                        <span className="font-serif italic font-normal text-primary text-[5vw] md:text-[4vw]">SOFTWARE ENGINEER & MOBILE SPECIALIST</span>
                    </motion.h1>

                    {/* Intro Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto font-body leading-relaxed"
                    >
                        I am a passionate Software Engineer and Mobile App Specialist based in Chennai, specializing in React Native, Go, and Cloud Ecosystems. With a deep-rooted belief in open-source philosophy, I build tools and frameworks that empower developers and users alike.
                    </motion.p>

                </div>
            </Container>
        </section>
    );
};

export default AboutHero;
