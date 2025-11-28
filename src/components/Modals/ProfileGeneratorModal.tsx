import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiX, FiCpu, FiRefreshCw } from 'react-icons/fi';
import { AboutData, BlogData, ProjectData, skillsCarocils, SocialMedia } from '../../pages/HeroPage/helpers';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    workExperience?: any[];
}

const ProfileGeneratorModal: React.FC<Props> = ({ isOpen, onClose, workExperience = [] }) => {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState<number | null>(null);
    const workerRef = useRef<Worker | null>(null);

    // Initialize worker
    useEffect(() => {
        if (isOpen && !workerRef.current) {
            workerRef.current = new Worker(new URL('../../workers/ai-worker.js', import.meta.url), {
                type: 'module'
            });

            workerRef.current.onmessage = (e) => {
                const { status, output, progress: dlProgress, file } = e.data;

                if (status === 'progress' && file?.includes('model')) {
                    setProgress(Math.round(dlProgress));
                } else if (status === 'ready') {
                    setProgress(null);
                    generateProfile();
                } else if (status === 'complete') {
                    setLoading(false);
                    setContent(output);
                }
            };

            // Start loading
            workerRef.current.postMessage({ type: 'load' });
        }

        return () => {
            if (!isOpen && workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [isOpen]);

    const generateProfile = () => {
        setLoading(true);
        setContent("");
        
        // Construct rich context from all available data
        const skills = skillsCarocils.join(", ");
        
        const projects = ProjectData.map(p => 
            `- ${p.title}: ${p.des} (Tech: ${p.catagrees.join(', ')})`
        ).join("\n");

        const blogs = BlogData.map(b => 
            `- ${b.blogTitle} (${b.categoree})`
        ).join("\n");

        const experience = workExperience.length > 0 
            ? workExperience.map((w: any) => 
                `- ${w.title} at ${w.company} (${w.duration?.[0]?.from ? new Date(w.duration[0].from).getFullYear() : ''} - Present): ${w.tags?.join(', ')}`
              ).join("\n")
            : "3+ years of experience in Full Stack Development.";

        const socialLinks = SocialMedia.map(s => `${s.name}: ${s.link}`).join(", ");

        const context = `
        PROFILE DATA:
        Name: DhineshKumar Thirupathi (DhiDroid)
        Role: Full Stack Developer & React Native Specialist
        
        ABOUT:
        ${AboutData}

        SKILLS:
        ${skills}

        WORK EXPERIENCE:
        ${experience}

        KEY PROJECTS:
        ${projects}

        ONLINE PRESENCE (BLOGS & SOCIALS):
        Active on GitHub, LinkedIn, and Medium.
        Recent Articles:
        ${blogs}
        Social Links: ${socialLinks}

        PERSONALITY:
        Passionate, detail-oriented, loves solving complex problems, open source contributor, tech writer.
        `;

        const prompts = [
            "Based on my projects and skills, write a compelling professional summary.",
            "Analyze my online presence and blogs to describe my technical expertise.",
            "Write a creative bio that highlights my experience with React Native and Open Source.",
            "Why should a client hire me based on my portfolio and work experience?",
            "Summarize my key achievements and technical strengths."
        ];
        
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

        workerRef.current?.postMessage({
            type: 'generate',
            text: randomPrompt,
            context: context
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#5315FC]/30 rounded-2xl shadow-[0_0_50px_rgba(83,21,252,0.2)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#5315FC]/20 rounded-lg">
                                    <FiCpu className="text-[#5315FC]" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">AI Profile Generator</h2>
                                    <p className="text-xs text-gray-400">Powered by Local LLM (LaMini-Flan-T5)</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 min-h-[300px] flex flex-col">
                            {progress !== null ? (
                                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center w-full max-w-xs mx-auto">
                                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-[#5315FC]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-1">Downloading AI Model...</p>
                                        <p className="text-sm text-gray-400">{progress}% Complete</p>
                                    </div>
                                </div>
                            ) : loading ? (
                                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                                    <div className="w-12 h-12 border-4 border-[#5315FC]/30 border-t-[#5315FC] rounded-full animate-spin" />
                                    <p className="text-gray-300 animate-pulse">Generating unique profile content...</p>
                                </div>
                            ) : (
                                <div className="whitespace-pre-wrap font-mono text-sm text-gray-200 leading-relaxed">
                                    {content}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between items-center">
                            <div className="text-xs text-gray-500">
                                * Content generated locally in your browser
                            </div>
                            <button
                                onClick={generateProfile}
                                disabled={loading || progress !== null}
                                className="flex items-center gap-2 px-4 py-2 bg-[#5315FC] hover:bg-[#3F0BD9] text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiRefreshCw className={loading ? "animate-spin" : ""} />
                                Generate New
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProfileGeneratorModal;
