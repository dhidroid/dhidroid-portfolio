import moment from "moment";
import React from "react";

// Example JSON structure for a professional work experience card
const workExpData = {
    company: "Amazon",
    posted: "5 days ago",
    title: "Senior UI/UX Designer",
    tags: ["Part-Time", "Senior Level"],
    rate: "1 Year",
    location: "Chennai, India",
    iconUrl: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg",
    duration: [{
        from: new Date(),
        toDate: new Date()
    }]
};

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
    data?: WorkExpData;
}

export default function WorkExpCard({ data = workExpData }: WorkExpCardProps) {

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

    return (
        <div className="w-full max-w-sm rounded-2xl p-4 bg-white/10 backdrop-blur-xl shadow-xl border border-white/20 flex flex-col gap-4 transition-all hover:scale-[1.02] cursor-pointer">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={data.iconUrl}
                        alt="company logo"
                        className="w-12 h-12 rounded-full object-cover p-2 bg-white/10 border border-white/20 shadow-lg"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white/70">{data.company}</span>
                        <span className="text-xs text-white/50">{data.posted}</span>
                    </div>
                </div>
                {/* <button className="text-white/70 hover:text-white text-xl">♡</button> */}
            </div>

            {/* Title */}
            <div>
                <h2 className="text-lg font-bold text-white">{data.title}</h2>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
                {data.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-xs font-semibold bg-white/20 rounded-full text-white backdrop-blur-lg"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">{getDurationRate(data.duration[0].from, data.duration[0].toDate)}</span>
                    <span className="text-xs text-white/60">{data.location}</span>
                </div>
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
                        <button
                            key={`${durationItem.from}-${durationItem.toDate}`}
                            className="px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-black/80 transition"
                        >
                            {fromDate} - {toDate}
                        </button>
                    );
                })}

            </div>
        </div>
    );
}
