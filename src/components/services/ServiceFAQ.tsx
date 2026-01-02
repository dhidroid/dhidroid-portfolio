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
    <section className="bg-white py-24 md:py-32">
        <Container className="max-w-[1800px] px-6">
            
            {/* Massive Header like Skills Page */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-24 md:mb-32"
            >
                 <motion.h1
                    variants={fadeInUp}
                    className="text-[10vw] md:text-[7rem] font-bold font-display uppercase leading-[0.85] tracking-tighter text-foreground mb-8"
                >
                    Common<br />
                    <span className="text-gray-300">Questions</span>
                </motion.h1>
                <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 md:items-start border-t border-gray-200 pt-8">
                    <span className="font-mono text-sm uppercase tracking-widest text-gray-500 md:w-48">FAQ</span>
                    <p className="max-w-xl text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
                        Answers to the most frequent inquiries about our process, technology, and collaboration style.
                    </p>
                </motion.div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-black/10 pt-12">
                
                {/* Section Title */}
                <div className="md:col-span-3">
                    <h2 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-gray-900 sticky top-32">
                        Inquiries
                    </h2>
                </div>

                {/* FAQ Cards Grid */}
                <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="group relative flex flex-col items-start gap-6 p-6 rounded-none border border-transparent hover:border-gray-100 transition-colors duration-300">
                             
                             {/* Icon & Category */}
                             <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                                    <faq.icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-1">
                                        {faq.category}
                                    </span>
                                    <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 group-hover:text-primary transition-colors">
                                        {faq.question}
                                    </h3>
                                </div>
                             </div>

                             {/* Answer "Card" (Always visible or Hover? User asked for 'like skills based' which has hover tooltip. But for FAQ, text is long. 
                                Let's make it visible on hover OR just part of the card design.
                                Actually, Skills page uses a "Tooltip" style.
                                Let's adapt it: The answer is displayed in a "Pricing Style" card that appears/floats OR just sits there.
                                
                                Better UX for FAQ:
                                Display the answer in a "Clean Box" below the title, mimicking the Skills hover card visual but maybe static or appearing?、
                                
                                Let's stick to the Skills "Hover Reveal" but positioned nicely.
                                Actually, let's make it *look* like the tooltip but rendered inline for better readability on this layout, 
                                OR use the exact Hover Tooltip if the text fits. `answer` is ~2-3 sentences. It fits in 300px.
                                
                                Let's implement the Hover Effect! It's super sleek.
                             */}
                             <div className="absolute left-0 top-full mt-4 w-full md:w-[400px] z-50 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                                <div className="bg-white border border-gray-200 shadow-2xl overflow-hidden rounded-none">
                                    <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center justify-between">
                                        <span className="font-bold font-display text-sm uppercase text-gray-600">The Answer</span>
                                        <MessageSquare className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {faq.answer}
                                        </p>
                                        <button className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:underline">
                                           Ask More <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                                {/* Arrow */}
                                <div className="absolute left-8 -top-2 w-4 h-4 bg-gray-50 border-t border-l border-gray-200 rotate-45"></div>
                             </div>

                             {/* Mobile / Fallback View (Visible only on touch/small? No, let's trust hover for desktop. For Mobile, we might need click. 
                                But for now, let's strictly mimic the Skills Page desktop behavior as requested). 
                                
                                However, to ensure usability, I will also render a short excerpt or 'Hover to view' hint?
                                No, the Skills page is minimal.
                             */}
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
