import React from 'react';
import moment from 'moment';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsStars } from 'react-icons/bs';


interface Props {
    BlogImage: string | any;
    Category: string;
    BlogTitle: string;
    author: string;
    date: Date | any;
    onPress: () => void;
    onSummarize?: () => void;
}

const HomeBlogCard: React.FC<Props> = ({
    BlogImage, BlogTitle, Category, author, date, onPress, onSummarize
}) => {
    return (
        <div 
            onClick={onPress}
            className="group relative w-[320px] h-[450px] rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(83,21,252,0.3)]"
        >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={BlogImage}
                    alt={BlogTitle}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                {/* Category Badge */}
                <div className="mb-3">
                    <span className="px-4 py-1.5 rounded-full bg-[#5315FC]/30 backdrop-blur-md text-white text-xs font-medium shadow-lg border border-[#5315FC]/50 capitalize font-secondary">
                        {Category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-3 font-secondary group-hover:text-[#A99DFF] transition-colors duration-300">
                    {BlogTitle}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-gray-300 text-sm">
                    <span className="font-primary">{author}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className="font-primary">{moment(date).format("MMM DD, YYYY")}</span>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-white font-medium text-sm group-hover:text-[#A99DFF] transition-colors duration-300">
                        <span>Read Article</span>
                        <AiOutlineArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSummarize?.();
                        }}
                        className="p-2 rounded-full bg-white/10 hover:bg-[#5315FC] backdrop-blur-md transition-all duration-300 border border-white/20 hover:border-[#5315FC]"
                        title="Summarize with AI"
                    >
                        <BsStars className="text-white" size={16} />
                    </button>
                </div>
            </div>

            {/* Hover Border Glow */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#5315FC]/50 transition-all duration-500 pointer-events-none" />
        </div>
    );
}

export default HomeBlogCard;
