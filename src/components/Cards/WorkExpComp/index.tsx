import moment from "moment";
import { useState } from "react";
import { BsStars } from "react-icons/bs";

interface WorkExpData {
    company: string;
    posted: string;
    title: string;
    tags: string[];
    rate: string;
    location: string;
    iconUrl: string;
    duration: { from: string; toDate: string }[];
}

interface WorkExpCardProps {
    data: WorkExpData;
    onSummarize?: (data: WorkExpData) => void;
    aiSummary?: string;
    isGenerating?: boolean;
    progress?: number | null;
}

export default function WorkExpCard({
    data,
    onSummarize,
    aiSummary,
    isGenerating,
    progress
}: WorkExpCardProps) {
    const [showSummary, setShowSummary] = useState(false);

    const getDurationRate = (from: string | Date, to: string | Date) => {
        const start = moment(from);
        const end = (to === null || to === undefined) ? moment(new Date()) : moment(to);

        const totalMonths = end.diff(start, "months");
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        if (years > 0 && months > 0) {
            return `${years} year${years > 1 ? "s" : ""} ${months} mon`;
        } else if (years > 0) {
            return `${years} year${years > 1 ? "s" : ""}`;
        } else {
            return `${months} mon`;
        }
    };

    const handleSummarize = () => {
        setShowSummary(true);
        onSummarize?.(data);
    };

    return (
        <div className="w-full max-w-sm rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(83,21,252,0.2)] border border-white/20 flex flex-col gap-4 transition-all hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(83,21,252,0.3)] hover:border-[#5315FC]/50 cursor-pointer group">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={data.iconUrl}
                            alt={`${data.company} logo`}
                            className="w-14 h-14 rounded-full object-cover p-2 bg-white/20 border border-white/30 shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5315FC]/20 to-[#7B47FF]/20 blur-md -z-10"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">{data.company}</span>
                        <span className="text-xs text-gray-400">{data.posted}</span>
                    </div>
                </div>
            </div>

            {/* Title */}
            <div>
                <h2 className="text-xl font-bold text-white group-hover:text-[#A99DFF] transition-colors">{data.title}</h2>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-[#5315FC]/20 to-[#7B47FF]/20 rounded-full text-white backdrop-blur-lg border border-[#5315FC]/30"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* AI Summary */}
            {showSummary && (
                <div className="rounded-xl bg-gradient-to-br from-[#5315FC]/10 to-[#7B47FF]/10 border border-[#5315FC]/30 p-4 backdrop-blur-md">
                    <div className="flex items-start gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5315FC] to-[#7B47FF] flex items-center justify-center flex-shrink-0">
                            <BsStars className="text-white" size={12} />
                        </div>
                        <span className="text-xs font-semibold text-white">AI Summary</span>
                    </div>
                    {progress !== null && progress !== undefined ? (
                        <div className="space-y-2">
                            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="h-full bg-[#5315FC] transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-center text-gray-400">Loading Model: {progress}%</p>
                        </div>
                    ) : isGenerating ? (
                        <div className="space-y-2">
                            <div className="h-3 bg-white/10 rounded animate-pulse"></div>
                            <div className="h-3 bg-white/10 rounded animate-pulse w-5/6"></div>
                            <div className="h-3 bg-white/10 rounded animate-pulse w-4/6"></div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-300 leading-relaxed">{aiSummary}</p>
                    )}
                </div>
            )}

            {/* Bottom */}
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">{getDurationRate(data.duration[0].from, data.duration[0].toDate)}</span>
                    <span className="text-xs text-gray-400">{data.location}</span>
                </div>
                <div className="flex flex-col gap-2">
                    {data.duration.map((durationItem) => {
                        const isPresentFrom =
                            durationItem?.from &&
                            moment(durationItem.from).isSame(moment(), "month");

                        const isPresentTo =
                            !durationItem?.toDate ||
                            moment(durationItem.toDate).isSame(moment(), "month");

                        const fromDate = isPresentFrom
                            ? "Present"
                            : moment(durationItem.from).format("MMM YYYY");

                        const toDate = isPresentTo
                            ? "Present"
                            : moment(durationItem.toDate).format("MMM YYYY");

                        return (
                            <div key={`${durationItem.from}-${durationItem.toDate}`} className="text-right text-xs text-gray-400 font-medium">
                                {fromDate} - {toDate}
                            </div>
                        );
                    })}

                    {/* AI Summarize Button */}
                    {!showSummary && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSummarize();
                            }}
                            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#5315FC] to-[#7B47FF] text-white text-xs font-semibold shadow-lg hover:shadow-[0_8px_24px_rgba(83,21,252,0.4)] transition-all hover:scale-105"
                        >
                            <BsStars size={14} />
                            <span>Summarize</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
