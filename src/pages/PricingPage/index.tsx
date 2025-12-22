import React, { useState } from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Check } from "lucide-react";
import { Link } from "react-router";

const plans = [
    {
        name: "Starter",
        price: "999",
        description: "Perfect for small projects and landing pages.",
        features: ["One Page Website", "Responsive Design", "Basic SEO", "1 Week Support"]
    },
    {
        name: "Professional",
        price: "2,499",
        popular: true,
        description: "Ideal for growing businesses and startups.",
        features: ["Multi-page Website", "CMS Integration", "Advanced SEO", "Analytics Setup", "1 Month Support"]
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large-scale applications and complex needs.",
        features: ["Custom Web App", "Database Integration", "User Authentication", "API Development", "Priority Support"]
    }
];

const PricingPage = () => {
    return (
        <React.Fragment>
             <SEO
                title="Pricing | Dhidroid"
                description="Transparent pricing for web development services."
                route="/pricing"
            />
            
             <section className="pt-32 pb-24 bg-gray-50 border-b border-gray-200">
                <Container className="text-center">
                    <Badge className="mb-6">Pricing</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Simple, transparent <span className="text-primary">pricing</span>
                    </h1>
                     <p className="max-w-2xl mx-auto text-lg text-gray-500">
                        Choose the plan that fits your project needs. No hidden fees.
                    </p>
                </Container>
            </section>

            <section className="py-24 bg-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                             <div 
                                key={plan.name} 
                                className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-gray-100 bg-gray-50/50'} transition-all duration-300`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-primary text-white text-sm font-bold">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-gray-500">/project</span>}
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/schedule">
                                    <Button 
                                        variant={plan.popular ? "primary" : "outline"} 
                                        className="w-full"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                             </div>
                        ))}
                    </div>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default PricingPage;
