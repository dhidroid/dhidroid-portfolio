import React from "react";
import { Link } from "react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "../ui/Button";
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
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/schedule">
                            <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                                {contact.cta}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                         <Link to="/contact">
                            <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                                <Mail className="mr-2 h-5 w-5" />
                                Contact Me
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CTA;
