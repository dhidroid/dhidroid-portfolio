import React from "react";
import { Link } from "react-router";
import { ArrowRight, Mail } from "lucide-react";

import { Container } from "../ui/Container";
import { PortfolioContent } from "../../utils/Data/portfolioContent";
import { CTABackgroundSVG } from "../Backgrounds/CTABackgroundSVG";

const CTA = () => {
    const { contact } = PortfolioContent;
    
    return (
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
            <CTABackgroundSVG />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        {contact.headline}
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {contact.subtext}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/5 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-left max-w-2xl mx-auto">

                        {/* 1. Schedule */}
                        <Link
                            to="/schedule"
                            className="group relative p-8 flex flex-row items-center gap-6 hover:bg-white/5 transition-colors duration-500"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-white/10 text-white rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display text-white group-hover:text-primary transition-colors mb-1">
                                    Schedule a Call
                                </h3>
                                <p className="text-sm text-gray-400 font-sans">
                                    Book a 30-minute consultation
                                </p>
                            </div>
                        </Link>

                        {/* 2. Contact */}
                        <Link
                            to="/contact"
                            className="group relative p-8 flex flex-row items-center gap-6 hover:bg-white/5 transition-colors duration-500"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-white/10 text-white rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display text-white group-hover:text-primary transition-colors mb-1">
                                    Send a Message
                                </h3>
                                <p className="text-sm text-gray-400 font-sans">
                                    Get in touch directly
                                </p>
                            </div>
                        </Link>

                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CTA;
