import React, { useEffect } from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import Cal, { getCalApi } from "@calcom/embed-react";
import { DynamicIcon } from "../../components/ui/DynamicIcon";
import { generateMetaForRoute } from "../../utils/seo";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, Terminal, Sparkles, MessageSquare } from "lucide-react";
import CTA from "../../components/home/CTA";

const SchedulePage = () => {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", {
                "styles": {
                    "branding": {
                        "brandColor": "#5235F6"
                    }
                },
                "hideEventTypeDetails": false,
                "layout": "month_view"
            });
        })();
    }, []);

    return (
        <React.Fragment>
            <SEO
                {...generateMetaForRoute('/schedule')}
                title="Schedule a Technical Consultation | Dhidroid (1.5+ Yrs Exp)"
                description="Book a 30-minute technical consultation call with Dhinesh Kumar (Senior Software Engineer & Mobile Specialist)."
            />

            <main className="bg-background min-h-screen">

                {/* Header Hero Section */}
                <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border bg-background">
                    <Container className="max-w-[1800px] px-6">
                        <div className="space-y-6">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-border bg-slate-100 dark:bg-zinc-900 font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
                                <span>CONSULTATION // 30-MIN TECHNICAL SESSION</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-[10vw] md:text-[6rem] leading-[0.88] font-extrabold font-display tracking-tighter text-foreground uppercase">
                                BOOK A <span className="text-[#5235F6] italic font-serif font-normal lowercase">technical</span> CALL.
                            </h1>

                            {/* Subtitle */}
                            <div className="grid md:grid-cols-12 gap-6 items-end pt-2">
                                <p className="md:col-span-8 text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-3xl font-body leading-relaxed">
                                    Discuss mobile app architecture, Go backend microservices, or full-stack engineering requirements directly with Dhinesh Kumar (1.5+ years experience).
                                </p>

                                <div className="md:col-span-4 flex justify-start md:justify-end gap-6 font-mono text-xs text-slate-500 dark:text-zinc-400 border-t md:border-t-0 border-border pt-4 md:pt-0">
                                    <div>
                                        <span className="block text-slate-400">DURATION</span>
                                        <span className="text-lg font-bold text-foreground">30 MIN</span>
                                    </div>
                                    <div className="border-l border-border pl-6">
                                        <span className="block text-slate-400">COST</span>
                                        <span className="text-lg font-bold text-[#5235F6]">FREE / 1:1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Main Schedule Workspace Section */}
                <section className="py-16 md:py-24 border-b border-border">
                    <Container className="max-w-[1800px] px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                            {/* Left Side: Technical Scope & Agenda */}
                            <div className="lg:col-span-5 space-y-10">

                                <div>
                                    <span className="font-mono text-xs text-[#5235F6] font-bold uppercase tracking-widest block mb-2">
                                        CONSULTATION AGENDA
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight text-foreground">
                                        Architecting High-Performance Software
                                    </h2>
                                    <p className="text-slate-600 dark:text-zinc-400 text-base mt-4 font-body leading-relaxed">
                                        Whether you are launching a new React Native mobile app, refactoring a legacy API, or designing scalable cloud microservices in Go, let's map out your execution strategy.
                                    </p>
                                </div>

                                {/* Discussion Topics */}
                                <div className="space-y-4">
                                    <div className="p-5 border border-border bg-slate-50/50 dark:bg-zinc-900/30 rounded-sm space-y-2">
                                        <div className="flex items-center gap-2 text-[#5235F6] font-mono text-xs font-bold uppercase tracking-wider">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>01. MOBILE APP ARCHITECTURE</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-zinc-400 font-body">
                                            React Native, iOS (Swift), Android (Kotlin), state management, native bridge optimization, and app store deployment.
                                        </p>
                                    </div>

                                    <div className="p-5 border border-border bg-slate-50/50 dark:bg-zinc-900/30 rounded-sm space-y-2">
                                        <div className="flex items-center gap-2 text-[#5235F6] font-mono text-xs font-bold uppercase tracking-wider">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>02. BACKEND & MICROSERVICES</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-zinc-400 font-body">
                                            Go (Golang) RPC services, Node.js REST/GraphQL APIs, PostgreSQL/MongoDB indexing, and sub-100ms response performance.
                                        </p>
                                    </div>

                                    <div className="p-5 border border-border bg-slate-50/50 dark:bg-zinc-900/30 rounded-sm space-y-2">
                                        <div className="flex items-center gap-2 text-[#5235F6] font-mono text-xs font-bold uppercase tracking-wider">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>03. CLOUD & SANITY STUDIO CMS</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-zinc-400 font-body">
                                            Headless Sanity Studio CMS integration, AWS/Vercel edge deployment, Docker containerization, and CI/CD pipelines.
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Bar */}
                                <div className="grid grid-cols-3 gap-4 border-t border-border pt-8 font-mono">
                                    <div className="p-3 bg-slate-100/50 dark:bg-zinc-900/50 border border-border rounded-sm text-center">
                                        <span className="block text-2xl font-bold text-[#5235F6]">1.5+</span>
                                        <span className="text-[10px] text-slate-500 uppercase">YEARS EXP</span>
                                    </div>
                                    <div className="p-3 bg-slate-100/50 dark:bg-zinc-900/50 border border-border rounded-sm text-center">
                                        <span className="block text-2xl font-bold text-foreground">50+</span>
                                        <span className="text-[10px] text-slate-500 uppercase">DELIVERIES</span>
                                    </div>
                                    <div className="p-3 bg-slate-100/50 dark:bg-zinc-900/50 border border-border rounded-sm text-center">
                                        <span className="block text-2xl font-bold text-emerald-600">100%</span>
                                        <span className="text-[10px] text-slate-500 uppercase">COMMITMENT</span>
                                    </div>
                                </div>

                            </div>

                            {/* Right Side: Cal.com Calendar Embed Frame */}
                            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-border rounded-sm overflow-hidden">
                                {/* Decorative terminal bar */}
                                <div className="bg-slate-100 dark:bg-zinc-950 border-b border-border p-3 flex items-center justify-between font-mono text-xs text-slate-500 select-none">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        <span className="ml-2 font-bold text-foreground text-[11px]">CAL.COM SCHEDULER</span>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-4">
                                    <Cal
                                        namespace="30min"
                                        calLink="dhidroid/30min"
                                        style={{ width: "100%", height: "100%", minHeight: "680px", }}
                                        config={{ "layout": "month_view", "theme": "light" }}
                                    />
                                </div>
                            </div>

                        </div>
                    </Container>
                </section>

            </main>

            <CTA />
        </React.Fragment>
    );
};

export default SchedulePage;
