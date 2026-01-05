import React, { useEffect } from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Badge } from "../../components/ui/Badge";
import { DynamicIcon } from "../../components/ui/DynamicIcon";
import { generateMetaForRoute } from "../../utils/seo";

const SchedulePage = () => {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", {
                "styles": {
                    "branding": {
                        "brandColor": "#000000"
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
            />

            <section className="pt-32 pb-24 bg-background border-b border-border/40">
                <Container className="text-center">
                    <Badge className="mb-6 rounded-none">Contact</Badge>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                        Let's <span className="text-primary">Talk</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-sans">
                        Schedule a 30-minute consultation to discuss your project.
                    </p>
                </Container>
            </section>

            <section className="py-24 bg-background">
                <Container className="max-w-[1800px] px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

                        {/* Left Side: Context & Quotes ("Session Based") */}
                        <div className="space-y-16">

                            {/* Intro / Context */}
                            <div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                                    Architecting the <br />
                                    <span className="text-primary italic font-serif">Future of Code.</span>
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed font-light">
                                    "Simplicity is the soul of efficiency."
                                </p>
                            </div>

                            {/* Quote 1 */}
                            <div className="border-l-2 border-primary/20 pl-8 py-2">
                                <div className="flex items-center gap-3 mb-4 text-primary">
                                    <DynamicIcon name="Docker" className="w-6 h-6" />
                                    <span className="font-mono text-sm uppercase tracking-widest">Infrastructure</span>
                                </div>
                                <blockquote className="text-2xl font-display font-medium text-foreground mb-4">
                                    "We build systems that sleep so you don't have to."
                                </blockquote>
                                <p className="text-sm font-mono text-muted-foreground">— DevOps Philosophy</p>
                            </div>

                            {/* Quote 2 */}
                            <div className="border-l-2 border-primary/20 pl-8 py-2">
                                <div className="flex items-center gap-3 mb-4 text-primary">
                                    <DynamicIcon name="Box" className="w-6 h-6" />
                                    <span className="font-mono text-sm uppercase tracking-widest">Artificial Intelligence</span>
                                </div>
                                <blockquote className="text-2xl font-display font-medium text-foreground mb-4">
                                    "AI isn't just about automation; it's about augmentation of human potential."
                                </blockquote>
                                <p className="text-sm font-mono text-muted-foreground">— The Neural Frontier</p>
                            </div>

                            {/* Stats or decoration */}
                            <div className="grid grid-cols-3 gap-8 border-t border-border/40 pt-8 mt-12">
                                <div>
                                    <span className="block text-3xl font-bold font-display mb-1">5+</span>
                                    <span className="text-xs font-mono uppercase text-muted-foreground">Years Exp</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold font-display mb-1">50+</span>
                                    <span className="text-xs font-mono uppercase text-muted-foreground">Projects</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold font-display mb-1">100%</span>
                                    <span className="text-xs font-mono uppercase text-muted-foreground">Commitment</span>
                                </div>
                            </div>

                        </div>

                        {/* Right Side: Calendar Embed */}
                        <div className="bg-card border border-border/60 shadow-2xl relative">
                            {/* Decorative terminal header */}
                            <div className="bg-muted/30 border-b border-border/60 p-3 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                <div className="ml-4 font-mono text-xs text-muted-foreground opacity-50">root@dhidroid:~/schedule</div>
                            </div>

                            <Cal
                                namespace="30min"
                                calLink="dhidroid/30min"
                                style={{ width: "100%", height: "100%", minHeight: "650px", overflow: "scroll" }}
                                config={{ "layout": "month_view", "theme": "light" }}
                            />
                        </div>

                    </div>
                </Container>
             </section>
        </React.Fragment>
    );
};

export default SchedulePage;
