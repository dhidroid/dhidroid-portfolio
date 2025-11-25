import MyImage from '../../../assets/dhinesh.jpg'
import animeImage from '../../../assets/Asta(BlackClover).jpeg'
import { FaLinkedin,FaGithub } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import React from "react";
import { RefreshCw, } from "lucide-react";

export default function FlipProfileCard() {
    const [flipped, setFlipped] = React.useState(false);

    return (
        <div className="flex justify-center items-center p-4">
            <div 
                className="relative w-80 h-[500px] cursor-pointer perspective-1000"
                onClick={() => setFlipped(!flipped)}
            >
                <style>{`
                    .preserve-3d { transform-style: preserve-3d; }
                    .backface-hidden { backface-visibility: hidden; }
                    .rotate-y-180 { transform: rotateY(180deg); }
                    .perspective-1000 { perspective: 1000px; }
                `}</style>

                <div
                    className={`transition-transform duration-700 preserve-3d w-full h-full ${
                        flipped ? "rotate-y-180" : ""
                    }`}
                >
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl">
                        {/* Background Image */}
                        <img
                            src={MyImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay - Bottom to Top */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6">
                            {/* Top Tags - Angled Pills */}
                            <div className="flex gap-2 transform -rotate-3 translate-x-2">
                                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium shadow-lg border border-white/30">
                                    Developer
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-purple-500/30 backdrop-blur-md text-white text-xs font-medium shadow-lg border border-purple-300/30">
                                    Designer
                                </span>
                            </div>

                            {/* Bottom Content */}
                            <div className="space-y-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-white">
                                        DhineshKumar Thirupathi
                                    </h1>
                                    <p className="text-sm text-white/80 mt-1">
                                        Full Stack Developer
                                    </p>
                                </div>

                                <p className="text-sm text-white/90 italic">
                                    "I already calculated 14 million paths"
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <a 
                                            href="https://www.linkedin.com/in/dhidroid-rndev" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors border border-white/20"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaLinkedin className="text-white" size={18} />
                                        </a>
                                        <a 
                                            href="https://www.instagram.com/dhidroid" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors border border-white/20"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ImInstagram className="text-white" size={18} />
                                        </a>
                                        <a 
                                            href="https://www.github.com/dhidroid" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors border border-white/20"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaGithub className="text-white" size={18} />
                                        </a>
                                    </div>

                                    <button
                                        className="p-3 rounded-full bg-white hover:bg-white/90 text-black shadow-xl transition-all hover:scale-110 active:scale-95"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFlipped(!flipped);
                                        }}
                                    >
                                        <RefreshCw size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Background Image */}
                        <img
                            src={animeImage}
                            alt="Anime"
                            className="w-full h-full object-fill"
                        />
                        
                        {/* Gradient Overlay - Bottom to Top */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/60 to-transparent" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6">
                            {/* Top Tags - Angled Pills */}
                            <div className="flex gap-2 transform rotate-2 translate-x-2">
                                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-black text-xs font-medium shadow-lg border border-white/30">
                                    Anime Fan
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-orange-500/30 backdrop-blur-md text-white text-xs font-medium shadow-lg border border-orange-300/30">
                                    Black Clover
                                </span>
                            </div>

                            {/* Bottom Content */}
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Favorite Quote
                                    </h2>
                                </div>

                                <p className="text-base text-white font-medium italic">
                                    "I'll surpass every limit in my way!"
                                </p>

                                <div className="flex gap-2 transform -rotate-1">
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs border border-white/20">
                                        #NeverGiveUp
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs border border-white/20">
                                        #Motivation
                                    </span>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        className="p-3 rounded-full bg-white hover:bg-white/90 text-black shadow-xl transition-all hover:scale-110 active:scale-95"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFlipped(flipped);
                                        }}
                                    >
                                        <RefreshCw size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}