import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';

interface Props {
    projectImage: string,
    projectTitle: string,
    projectDes: string,
    onPress?: () => void,
    catagrees?: any[],
    link?: string
}

const ProjectCard: React.FC<Props> = ({ projectImage, projectDes, projectTitle, catagrees, link }) => {
    return (
        <div className="group relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#5315FC]/10 via-transparent to-[#A99DFF]/10 backdrop-blur-xl border border-white/10 hover:border-[#5315FC]/50 transition-all duration-500 hover:shadow-[0_20px_80px_rgba(83,21,252,0.3)]">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#5315FC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex flex-col lg:flex-row gap-6 md:gap-8 p-6 md:p-8">
                {/* Image Container */}
                <div className="relative w-full lg:w-[45%] flex-shrink-0">
                    <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square">
                        {/* Image with Overlay */}
                        <img
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src={projectImage}
                            alt={projectTitle}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Floating Badge */}
                        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[#5315FC]/80 backdrop-blur-md border border-white/20 text-white text-sm font-medium shadow-lg">
                            Featured
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col justify-center space-y-6">
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2">
                        {catagrees?.map((data, index) => (
                            <span
                                key={index}
                                className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium shadow-lg border border-white/20 whitespace-nowrap font-secondary hover:bg-[#5315FC]/30 hover:border-[#5315FC]/50 transition-all duration-300"
                            >
                                {data || data.title}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold font-secondary text-white leading-tight group-hover:text-[#A99DFF] transition-colors duration-300">
                        {projectTitle}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 font-primary text-base md:text-lg leading-relaxed line-clamp-3">
                        {projectDes}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <button
                            onClick={() => window.open(link)}
                            className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#5315FC] hover:bg-[#7B47FF] text-white font-semibold transition-all duration-300 hover:shadow-[0_10px_40px_rgba(83,21,252,0.5)] hover:scale-105"
                        >
                            <span>View Project</span>
                            <AiOutlineArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300" size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Border Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5315FC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    );
}

export default ProjectCard