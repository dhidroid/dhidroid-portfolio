import React from "react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { PortfolioContent } from "../../utils/Data/portfolioContent";
import { SkillsBackgroundSVG } from "../Backgrounds/SkillsBackgroundSVG";

const Skills = () => {
    const { skills } = PortfolioContent;

    return (
        <section className="py-24 bg-gray-50/50 relative overflow-hidden">
            <SkillsBackgroundSVG />
            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">Tech Stack</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Tools & <span className="text-primary">Technologies</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Frontend */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-blue-500" />
                            Frontend
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.frontend.map(skill => (
                                <Badge key={skill} variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 transition-colors">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Backend */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500" />
                            Backend
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.backend.map(skill => (
                                <Badge key={skill} variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-600 border border-gray-100 transition-colors">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-purple-500" />
                            DevOps & Tools
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.tools.map(skill => (
                                <Badge key={skill} variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-100 transition-colors">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Design */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-pink-500" />
                            Design & Arch
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.design.map(skill => (
                                <Badge key={skill} variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-gray-100 transition-colors">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Skills;
