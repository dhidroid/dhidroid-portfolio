import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../ui/Container";

const testimonials = [
  {
    id: 1,
    quote: "Dhidroid transformed our digital presence. The attention to detail and animations are world-class.",
    author: "Sarah Jenkins",
    role: "CEO, FinTech Co",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "Exceptional engineering skills. The site is blazing fast and the CMS integration is seamless.",
    author: "Michael Chen",
    role: "CTO, StartUp Inc",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "A true partner in design. They understood our brand voice immediately and elevated it.",
    author: "Emily Davis",
    role: "Director, ArtGallery",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
   {
    id: 4,
    quote: "The best developer experience we've had. Professional, timely, and wildly creative.",
    author: "David Wilson",
    role: "Founder, TechFlow",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="py-32 bg-gray-50 overflow-hidden">
       <Container>
          <div className="mb-16">
             <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Client Words</h2>
             <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                TRUSTED BY <span className="text-primary italic font-serif font-normal">INNOVATORS.</span>
             </h3>
          </div>
       </Container>

       <div className="relative w-full">
          <motion.div 
             style={{ x }}
             className="flex gap-8 px-6 w-max"
          >
             {testimonials.map((item) => (
                <div 
                   key={item.id} 
                   className="w-[350px] md:w-[500px] p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                   <p className="text-xl md:text-2xl font-body leading-relaxed text-gray-700 mb-8">
                      "{item.quote}"
                   </p>
                   
                   <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.author} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                         <h4 className="font-bold text-foreground">{item.author}</h4>
                         <p className="text-sm text-gray-500 uppercase tracking-wider">{item.role}</p>
                      </div>
                      
                      <div className="ml-auto text-primary">
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.017 21L14.017 18C14.017 16.896 14.353 15.925 15.026 15.088C15.699 14.249 16.591 13.565 17.703 13.036V11.135C16.963 11.235 16.274 11.432 15.635 11.727C14.996 12.022 14.457 12.434 14.017 12.964V7H19.017V13H16.017C16.017 14.103 16.452 15.045 17.322 15.827L15.422 17.608C14.49 16.711 14.017 15.508 14.017 14V21H14.017ZM5.00293 21L5.00293 18C5.00293 16.896 5.33893 15.925 6.01193 15.088C6.68493 14.249 7.57693 13.565 8.68893 13.036V11.135C7.94893 11.235 7.25993 11.432 6.62093 11.727C5.98193 12.022 5.44293 12.434 5.00293 12.964V7H10.0029V13H7.00293C7.00293 14.103 7.43793 15.045 8.30793 15.827L6.40793 17.608C5.47493 16.711 5.00293 15.508 5.00293 14V21H5.00293Z" />
                         </svg>
                      </div>
                   </div>
                </div>
             ))}
          </motion.div>
       </div>
    </section>
  );
};

export default Testimonials;
