import React from "react";
import { Container } from "../ui/Container";
import { PortfolioContent } from "../../utils/Data/portfolioContent";

const AboutHero = () => {
    const { about } = PortfolioContent;
    
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-900 text-white overflow-hidden">
             {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <Container className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-8 backdrop-blur-sm border border-white/10">
                    {about.title}
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                    Building the <span className="text-primary">future</span> <br className="hidden md:block" />
                    one line of code at a time.
                </h1>
                
                <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed text-left md:text-center">
                    {about.story.map((paragraph, index) => (
                        <p key={index} className={index === 0 ? "font-medium text-gray-300" : ""}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default AboutHero;
