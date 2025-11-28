import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiX, FiSend, FiCpu, FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import { AboutData, BlogData, ProjectData, skillsCarocils } from '../../pages/HeroPage/helpers';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface Props {
    worker?: Worker | null;
}

const ChatBot: React.FC<Props> = ({ worker }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm DhiDroid. Ask me anything about Dhinesh's work, skills, or experience." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!worker) return;

        const handleMessage = (e: MessageEvent) => {
            const { status, output } = e.data;
            if (status === 'complete' && output) {
                setMessages(prev => [...prev, { role: 'assistant', content: output }]);
                setIsTyping(false);
            }
        };

        worker.addEventListener('message', handleMessage);
        return () => worker.removeEventListener('message', handleMessage);
    }, [worker]);

    const handleSend = () => {
        if (!input.trim() || !worker) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput("");
        setIsTyping(true);

        // Construct rich context
        const skills = skillsCarocils.join(", ");
        const projects = ProjectData.map(p => `- ${p.title}: ${p.des}`).join("\n");
        const blogs = BlogData.map(b => `- ${b.blogTitle}`).join("\n");
        const context = `
        You are DhiDroid, an AI assistant for DhineshKumar Thirupathi's portfolio.
        
        PROFILE:
        Name: DhineshKumar Thirupathi
        Role: Full Stack Developer & React Native Specialist
        About: ${AboutData}
        Skills: ${skills}
        Projects: ${projects}
        Blogs: ${blogs}
        
        INSTRUCTIONS:
        - Answer questions based on the profile data.
        - Be professional, friendly, and concise.
        - If asked about contact info, refer to the contact section.
        - Do not hallucinate facts not present in the data.
        `;

        worker.postMessage({
            type: 'generate',
            text: userMessage,
            context: context
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            height: isMinimized ? 'auto' : '500px',
                            width: isMinimized ? '300px' : '350px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#5315FC]/30 rounded-2xl shadow-[0_0_50px_rgba(83,21,252,0.2)] overflow-hidden flex flex-col mb-4"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#5315FC]/20 rounded-lg">
                                    <FiCpu className="text-[#5315FC]" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">DhiDroid Chat</h3>
                                    <p className="text-[10px] text-gray-400">Powered by Local LLM (LaMini-Flan-T5)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="text-gray-400 hover:text-white">
                                    {isMinimized ? <FiMaximize2 size={16} /> : <FiMinimize2 size={16} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                    <FiX size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#5315FC]/30">
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                                msg.role === 'user' 
                                                ? 'bg-[#5315FC] text-white rounded-tr-none' 
                                                : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                                            }`}>
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                                <span className="w-2 h-2 bg-[#5315FC] rounded-full animate-bounce" />
                                                <span className="w-2 h-2 bg-[#5315FC] rounded-full animate-bounce delay-100" />
                                                <span className="w-2 h-2 bg-[#5315FC] rounded-full animate-bounce delay-200" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t border-white/10 bg-white/5">
                                    <div className="flex items-center gap-2 bg-black/20 rounded-xl border border-white/10 p-2 focus-within:border-[#5315FC]/50 transition-colors">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Ask about Dhinesh..."
                                            className="flex-1 bg-transparent text-white text-sm outline-none px-2"
                                            disabled={isTyping}
                                        />
                                        <button 
                                            onClick={handleSend}
                                            disabled={!input.trim() || isTyping}
                                            className="p-2 bg-[#5315FC] rounded-lg text-white hover:bg-[#3F0BD9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <FiSend size={16} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-[#5315FC] to-[#7B47FF] flex items-center justify-center text-white shadow-[0_0_30px_rgba(83,21,252,0.4)] border border-white/20"
                >
                    <BsStars size={24} />
                </motion.button>
            )}
        </div>
    );
};

export default ChatBot;
