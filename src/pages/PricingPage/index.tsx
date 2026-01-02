import React, { useState } from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Check } from "lucide-react";
import { Link } from "react-router";
import { cn } from "../../utils/cn";

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
            
            <section className="pt-32 pb-24 bg-background border-b border-border/40">
                <Container className="text-center">
                    <Badge className="mb-6 rounded-none">Pricing</Badge>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                        Simple, transparent <span className="text-primary">pricing</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-sans">
                        Choose the plan that fits your project needs. No hidden fees.
                    </p>
                </Container>
            </section>

            <section className="py-24 bg-background">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-card">
                        {plans.map((plan, idx) => (
                             <div 
                                key={plan.name} 
                                className={cn(
                                    "relative p-10 flex flex-col hover:bg-muted/5 transition-colors duration-300",
                                    plan.popular && "bg-muted/5"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-0 w-full bg-primary/10 border-b border-primary/20 text-primary text-xs font-bold font-mono py-1.5 text-center uppercase tracking-widest">
                                        Most Popular
                                    </div>
                                )}

                                <div className={cn("mb-8", plan.popular && "mt-6")}>
                                    <h3 className="text-xl font-display font-semibold mb-2">{plan.name}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="mb-8 font-display">
                                    <span className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter">${plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-muted-foreground text-sm ml-1 font-sans">/project</span>}
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-none text-primary flex items-center justify-center mt-0.5">
                                                <Check size={16} strokeWidth={2} />
                                            </div>
                                            <span className="text-sm text-foreground/80 font-sans">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/schedule" className="mt-auto">
                                    <Button 
                                        variant={plan.popular ? "primary" : "outline"} 
                                        className="w-full rounded-none h-12 text-sm font-medium tracking-wide"
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
