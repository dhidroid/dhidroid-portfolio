import React from "react";
import { Container } from "../ui/Container";

const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "10+", label: "Projects Completed" },
    { number: "5+", label: "Happy Clients" },
    { number: "24/7", label: "Support" }
];

const AboutStats = () => {
    return (
        <section className="py-12 bg-white border-b border-gray-100 -mt-10 relative z-20">
            <Container>
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center relative">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                                {/* Divider for desktop */}
                                {index !== stats.length - 1 && (
                                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-200" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AboutStats;
