import React from 'react';
import { Container } from '../ui/Container';
import { ArrowRight } from 'lucide-react';
import { CanvasCard } from '../ui/CanvasCard';

const FEATURES = [
    {
        id: "01",
        title: "AI Revolution",
        description: "Access procurement securely with Blockchain, ensuring part authenticity and transparency."
    },
    {
        id: "02",
        title: "AI Chatbot JET",
        description: "Boost sourcing with AI Chatbot JET on popular messaging platforms instantly."
    },
    {
        id: "03",
        title: "AI Assistance",
        description: "Interact efficiently with our system using voice commands and automated workflows."
    }
];

const FeatureShowcase: React.FC = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Laptop Mockup Visual */}
                    <div className="relative">
                        {/* Background blob */}
                        <div className="absolute inset-0 bg-gray-100 rounded-[3rem] transform -rotate-2 scale-95 -z-10" />
                        
                        {/* Laptop Mockup */}
                        <CanvasCard className="bg-slate-900 p-0 overflow-hidden border-8 border-slate-900 rounded-[1.5rem] shadow-2xl aspect-[4/3] relative group">
                            <div className="absolute top-0 left-0 w-full h-8 bg-slate-800 flex items-center justify-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-gray-600" />
                            </div>
                            <div className="bg-gray-50 h-full w-full p-4 overflow-hidden relative">
                                {/* Dashboard UI Mockup */}
                                <div className="flex gap-4 mb-4">
                                     <div className="w-1/3 bg-white rounded-xl h-24 shadow-sm p-4 space-y-2">
                                         <div className="w-8 h-8 rounded-full bg-primary/10" />
                                         <div className="h-2 w-16 bg-gray-100 rounded-full" />
                                     </div>
                                     <div className="w-1/3 bg-white rounded-xl h-24 shadow-sm p-4 space-y-2">
                                         <div className="w-8 h-8 rounded-full bg-green-100" />
                                         <div className="h-2 w-16 bg-gray-100 rounded-full" />
                                     </div>
                                      <div className="w-1/3 bg-white rounded-xl h-24 shadow-sm p-4 space-y-2">
                                         <div className="w-8 h-8 rounded-full bg-orange-100" />
                                         <div className="h-2 w-16 bg-gray-100 rounded-full" />
                                     </div>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm h-48 w-full p-4 flex items-end justify-between gap-2">
                                    {[40, 70, 50, 90, 60, 80].map(h => (
                                        <div key={h} style={{height: `${h}%`}} className="flex-1 bg-primary/20 rounded-t-lg relative">
                                            <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" style={{height: '50%'}} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CanvasCard>

                        {/* Floating CTA / Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-2 rounded-full shadow-xl">
                            <Button className="rounded-full bg-slate-900 text-white px-6">
                                Demo our dashboard.
                            </Button>
                        </div>
                         <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-full shadow-xl w-14 h-14 flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-slate-900" />
                        </div>
                    </div>

                    {/* Right: Feature List & Stats */}
                    <div className="relative">
                        <div className="space-y-8 divide-y divide-gray-100">
                            {FEATURES.map((feature) => (
                                <div key={feature.id} className="pt-8 first:pt-0 group cursor-default">
                                    <div className="flex items-start gap-6">
                                        <div className="text-sm font-bold text-gray-400 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:text-primary transition-colors">
                                            {feature.id}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                            <p className="text-gray-500 leading-relaxed text-base max-w-sm">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 40% Stat Card (Reference Element) */}
                        <div className="mt-12 md:absolute md:top-20 md:-right-12">
                            <div className="bg-primary p-8 rounded-[2rem] text-white shadow-2xl shadow-primary/30 w-full md:w-64 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <div className="text-5xl font-bold mb-2">40%</div>
                                <div className="h-1 w-full bg-white/20 rounded-full mb-4">
                                    <div className="h-full w-[40%] bg-white rounded-full" />
                                </div>
                                <p className="text-sm font-medium opacity-90 leading-relaxed">
                                    JET AI Chatbot slashes response times and optimizes procurement workflows.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

// Simple import helper for Button if needed locally, but we defined it at top
import { Button } from '../ui/Button';

export default FeatureShowcase;
