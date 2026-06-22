import React from "react";
import { Link } from "react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { PortfolioContent } from "../../utils/Data/portfolioContent";

const CTA = () => {
    const { contact } = PortfolioContent;
    
    return (
        <section className="py-24 md:py-32 bg-background border-t border-border relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                    
                    {/* Left Column: Huge typography-first heading */}
                    <div className="lg:col-span-5 space-y-4">
                        <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 block uppercase tracking-widest">
                            [ COLLABORATION // CONNECT ]
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tighter text-foreground leading-[0.85] max-w-xl">
                            Ready to build something <span className="text-[#5235F6]">scalable?</span>
                        </h2>
                    </div>

                    {/* Right Column: Subtext and Flat Swiss Action Cards */}
                    <div className="lg:col-span-7 space-y-12">
                        <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-sans max-w-2xl">
                            {contact.subtext}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Card 1: Schedule Call */}
                            <Link
                                to="/schedule"
                                className="group p-8 border border-border bg-slate-50/50 dark:bg-zinc-900/50 hover:bg-slate-100/80 dark:hover:bg-zinc-900/90 rounded-sm transition-all duration-300 flex flex-col justify-between h-[200px]"
                            >
                                <div className="w-12 h-12 flex items-center justify-center border border-border bg-background text-foreground rounded-sm group-hover:bg-[#5235F6] group-hover:text-white transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold font-display uppercase tracking-tight text-foreground">
                                        Schedule a Call
                                    </h3>
                                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-2">
                                        Book a 30-min consultation
                                    </p>
                                </div>
                            </Link>

                            {/* Card 2: Contact message */}
                            <Link
                                to="/contact"
                                className="group p-8 border border-border bg-slate-50/50 dark:bg-zinc-900/50 hover:bg-slate-100/80 dark:hover:bg-zinc-900/90 rounded-sm transition-all duration-300 flex flex-col justify-between h-[200px]"
                            >
                                <div className="w-12 h-12 flex items-center justify-center border border-border bg-background text-foreground rounded-sm group-hover:bg-[#5235F6] group-hover:text-white transition-all duration-300">
                                    <Mail className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold font-display uppercase tracking-tight text-foreground">
                                        Send a Message
                                    </h3>
                                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-2">
                                        Get in touch directly
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CTA;
