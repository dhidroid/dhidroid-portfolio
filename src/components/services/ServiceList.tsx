import React from "react";
import { Container } from "../ui/Container";
import CapabilityCard from "./CapabilityCard";
import { PERSONAL_INFO } from "../../config/personal";

const ServiceList = () => {
    // Mapping Profiles/Capabilities to Cards
    const capabilities = [
        {
            title: "Open Source Engineering",
            description: "Exploring cutting-edge technologies and contributing to the developer community through open source.",
            link: PERSONAL_INFO.social.github,
            linkText: "GitHub Profile",
            variant: 'database' as const // Database/Code metaphor
        },
        {
            title: "Full Stack Development",
            description: "Building scalable digital products with React, Node.js, and modern architectural patterns.",
            link: "/works", // Internal link to works
            linkText: "View Projects",
            variant: 'flow' as const // Flow/Process metaphor
        },
        {
            title: "Professional Network",
            description: "Connecting with industry leaders, sharing insights, and fostering professional relationships.",
            link: PERSONAL_INFO.social.linkedin,
            linkText: "LinkedIn Profile",
            variant: 'network' as const // Network/Hub metaphor
        },
        {
            title: "Community & Verified Work",
            description: "Engaging with the global developer ecosystem and showcasing verified professional achievements.",
            link: PERSONAL_INFO.social.peerlist || PERSONAL_INFO.social.twitter,
            linkText: "Peerlist / X",
            variant: 'chart' as const // Chart/Structure metaphor
        }
    ];

  return (
    <section className="py-24 bg-background border-t border-slate-200 dark:border-zinc-800">
      <Container>
         <div className="mb-16 select-none">
            <div className="mb-4">
               <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-zinc-700/50">
                  04 // CAPABILITIES
               </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 dark:text-white uppercase tracking-tighter mb-6">
                Capabilities & Connect
            </h2>
            <p className="text-lg text-slate-500 dark:text-zinc-400 max-w-xl font-body">
                Explore my technical expertise and professional presence across the digital ecosystem.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
               <CapabilityCard 
                 key={index}
                 {...cap}
                 index={index}
               />
            ))}
         </div>
      </Container>
    </section>
  );
};

export default ServiceList;
