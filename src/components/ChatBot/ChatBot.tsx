import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiX, FiSend, FiTerminal } from 'react-icons/fi';
import { useAI } from '../../context/AIContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const { worker, isModelReady, loadingProgress, generateText } = useAI();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm DhiDroid v3.0 (Local AI). I can answer questions about Dhinesh's portfolio, skills, and even provide code snippets. Try asking about 'sending mail' or 'React Native'.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Portfolio Context
  const portfolioContext = `
You are DhiDroid, an AI assistant for DhineshKumar Thirupathi's portfolio.
Dhinesh is a Full Stack Developer (React Native, React, Node.js) at Natobotics.
Skills: React Native, TypeScript, Node.js, Firebase, AWS, Go, Kotlin, Swift.
Projects:
- React Native Boilerplate: Scalable app starter.
- Event Mobile App: React Native based.
- Portfolio: React + Vite + Tailwind.

Instructions:
1. If asked about "sending mail" or "contact", provide this email: dhinesh4668@outlook.com and mention the contact form.
2. If asked about "programming" or "code", provide a code snippet in markdown if relevant.
3. Format your answers using Markdown (e.g., **bold**, *italic*, \`code\`).
4. Keep answers professional but friendly.
`;

  useEffect(() => {
    if (worker) {
      const onMessageReceived = (e: MessageEvent) => {
        const { status, output, error, id } = e.data;

        if (status === 'complete') {
          // Show all completions in the chat to provide feedback for actions like summarization
          setIsTyping(false);
          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(m => m.text === output)) return prev;
            
            return [...prev, {
              id: id || Date.now().toString(),
              text: output || "I couldn't generate a response.",
              sender: 'bot',
              timestamp: new Date()
            }];
          });
          
          // If the chat is closed and we get a message (e.g. from a summary button click), open it
          if (!isOpen) {
             setIsOpen(true);
          }
        } else if (status === 'error') {
          console.error("Worker Error:", error);
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "Error: " + error,
            sender: 'bot',
            timestamp: new Date()
          }]);
        }
      };

      worker.addEventListener('message', onMessageReceived);
      return () => worker.removeEventListener('message', onMessageReceived);
    }
  }, [worker]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, loadingProgress, isOpen]);

  const handleSend = () => {
    if (!input.trim() || !isModelReady) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    generateText(userMsg.text, portfolioContext, userMsg.id);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-[#5315FC] text-white p-4 rounded-full shadow-[0_0_20px_rgba(83,21,252,0.6)] hover:bg-[#3F0BD9] transition-colors backdrop-blur-sm"
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(83,21,252,0.8)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiTerminal size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-black/90 border border-[#5315FC]/30 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden flex flex-col font-mono"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-[#5315FC]/20 p-3 border-b border-[#5315FC]/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isModelReady ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                <span className="text-[#A99DFF] font-bold text-sm">DhiDroid Terminal</span>
              </div>
              <span className="text-white text-xs opacity-80">v3.0 (Local)</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#3F0BD9] scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user'
                        ? 'bg-[#5315FC]/20 text-white border border-[#5315FC]/30 rounded-br-none'
                        : 'bg-gray-800/50 text-gray-200 border border-gray-700 rounded-bl-none'
                      }`}
                  >
                    {msg.sender === 'bot' && <span className="text-[#5315FC] font-bold mr-2">{'>'}</span>}
                    {/* Plain Text Rendering */}
                    <div className="whitespace-pre-wrap font-mono text-xs md:text-sm">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading / Progress Indicator */}
              {!isModelReady && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/50 p-3 rounded-lg rounded-bl-none border border-gray-700 text-xs text-[#A99DFF] w-full">
                    {loadingProgress !== null ? (
                      <>
                        <div className="flex justify-between mb-1">
                          <span>Downloading AI Model...</span>
                          <span>{loadingProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                          <div className="bg-[#5315FC] h-full transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#A99DFF] animate-pulse" />
                        Initializing AI Model...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/50 p-3 rounded-lg rounded-bl-none border border-gray-700">
                    <span className="text-[#5315FC] font-bold mr-2">{'>'}</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-[#5315FC]/10 border-t border-[#5315FC]/30 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isModelReady ? "Type a command..." : "Initializing..."}
                disabled={!isModelReady}
                className="flex-1 bg-black/50 border border-[#5315FC]/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5315FC] placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!isModelReady || !input.trim()}
                className="bg-[#5315FC] text-white p-2 rounded hover:bg-[#3F0BD9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
