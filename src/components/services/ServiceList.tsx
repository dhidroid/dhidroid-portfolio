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
    <section className="py-24 bg-[#111111]">
      <Container>
         <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                Capabilities & Connect
            </h2>
            <div className="h-1 w-20 bg-white mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl">
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
