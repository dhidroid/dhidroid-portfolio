import React from 'react';
import moment from 'moment';
import { AiOutlineRight } from 'react-icons/ai';
import { IoReader } from "react-icons/io5";
import { getIconForCategory } from '../../../utils/iconMapper';

interface Props {
    BlogImage?: string | undefined;
    categories?: string[];
    BlogTitle: string;
    excerpt?: string;
    readingTime?: number;
    author?: string;
    date: Date | any;
    onPress: () => void;
    onSummarize?: () => void;
}

const HomeBlogCard: React.FC<Props> = ({
    BlogImage, BlogTitle, categories = [], excerpt, readingTime, author, date, onPress, onSummarize
}) => {
    return (
        <article
            onClick={onPress}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onPress(); }}
            aria-label={`Read article ${BlogTitle}`}
            className="group bg-white/3 border border-white/6 rounded-xl p-6 flex flex-col h-full transition-shadow duration-150 hover:shadow-md hover:-translate-y-1 cursor-pointer"
        >
            <header className="mb-4 flex items-center gap-3 flex-wrap">
                {categories.length ? categories.map((c) => {
                    const Icon = getIconForCategory(c);
                    return (
                        <span key={c} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#5315FC]/10 text-[#5315FC] border border-[#5315FC]/20">
                            <Icon size={12} className="text-[#5315FC]" />
                            <span className="capitalize">{c}</span>
                        </span>
                    );
                }) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#5315FC]/10 text-[#5315FC] border border-[#5315FC]/20">Uncategorized</span>
                )}
            </header>

            {BlogImage && (
                <div className="mb-4 h-40 w-full overflow-hidden rounded-md">
                    <img src={BlogImage} alt={BlogTitle} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-white leading-snug mb-2 font-secondary">{BlogTitle}</h3>
                {excerpt && (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{excerpt}</p>
                )}
            </div>

            <footer className="mt-4 flex items-center justify-between text-sm text-gray-400">
                <div>
                    <span className="block">{author}</span>
                    <time className="block text-gray-400" dateTime={new Date(date).toISOString()}>{moment(date).format('MMM DD, YYYY')}</time>
                </div>
                <div className="flex items-center gap-3">
                    {onSummarize && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onSummarize(); }}
                            className="p-2 rounded-md bg-white/5 hover:bg-white/6 text-gray-300"
                            title="Summarize with AI"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300"><path d="M12 2 L13.09 8.26 L19.6 8.26 L14.27 11.74 L15.36 18 L12 14.77 L8.64 18 L9.73 11.74 L4.4 8.26 L10.91 8.26 L12 2 Z" fill="currentColor" /></svg>
                        </button>
                    )}

                    <span className="text-gray-400">{readingTime ? `${readingTime} min` : ''}</span>
                    <IoReader className="text-gray-400 transition-transform duration-150 group-hover:translate-x-1" />
                </div>
            </footer>
        </article>
    );
}

export default HomeBlogCard;
