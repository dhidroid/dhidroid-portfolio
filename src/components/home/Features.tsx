import React from "react";
import { Container } from "../ui/Container";
import { PortfolioContent } from "../../utils/Data/portfolioContent";
import { FeatureAccentSVG } from "../Backgrounds/FeatureAccentSVG";

const Features = () => {
    const { services } = PortfolioContent;

    return (
        <section className="py-24 overflow-hidden bg-gray-50/50 relative">
            <FeatureAccentSVG />
            <Container className="relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Technical <span className="text-primary">Expertise</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        I deliver end-to-end solutions, focusing on scalability, performance, and user experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div 
                                key={index} 
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={24} strokeWidth={2} />
                                
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Features;
