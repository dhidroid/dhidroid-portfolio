import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiX, FiSend, FiTerminal, FiMail, FiCalendar, FiBriefcase, FiCpu } from 'react-icons/fi';
import { useAI } from '../../context/AIContext';
import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face Inference API
// Falls back to empty string (which uses anonymous limits or local model fallback)
const hf = new HfInference(import.meta.env.VITE_HF_TOKEN || "");

interface MailDraft {
  to: string;
  subject: string;
  body: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actionType?: 'email' | 'schedule' | 'projects' | 'skills';
  draft?: MailDraft;
}

const DHIDROID_GUIDE = `
You are DhiDroid, the official AI Agent guide for DhineshKumar Thirupathi's portfolio.
Dhinesh's details:
- Role: Full Stack Mobile & Web Developer at Natobotics Technology Pvt. Ltd. (Chennai, India)
- Experience: 1.5+ Years
- Contact Email: dhinesh4668@outlook.com
- Tech Stack: React Native, React, Go, Node.js, TypeScript, AWS, Postgres, Tailwind, Figma.
- Swiss Minimalist aesthetic theme with Stuxen Purple (#5235F6) brand color, off-white/anthracite canvas, sharp elements, and zero shadows.
- Visual elements: D3-based Voronoi stippling ASCII animation on the home hero, and interactive D3 world coordinate stippling map on the About page.
`;

const ChatBot = () => {
  const { worker, isModelReady, loadingProgress, generateText } = useAI();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm DhiDroid v5.0, your portfolio agent. I can guide you through Dhinesh's studio, answer technical queries, draft emails, or schedule calls. Try commands like 'write an email to hire Dhinesh' or 'explore projects'.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Monitor worker messages if local fallback is triggered
  useEffect(() => {
    if (worker) {
      const onMessageReceived = (e: MessageEvent) => {
        const { status, output, error, id } = e.data;

        if (status === 'complete') {
          setIsTyping(false);
          setMessages(prev => {
            if (prev.some(m => m.text === output)) return prev;
            return [...prev, {
              id: id || Date.now().toString(),
              text: output || "I completed the local compilation check.",
              sender: 'bot',
              timestamp: new Date()
            }];
          });
          if (!isOpen) setIsOpen(true);
        } else if (status === 'error') {
          console.error("Worker Error:", error);
          setIsTyping(false);
        }
      };

      worker.addEventListener('message', onMessageReceived);
      return () => worker.removeEventListener('message', onMessageReceived);
    }
  }, [worker, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Execute Mail client launcher
  const handleSendMail = (draft: MailDraft) => {
    const subject = encodeURIComponent(draft.subject);
    const body = encodeURIComponent(draft.body);
    window.location.href = `mailto:${draft.to}?subject=${subject}&body=${body}`;
  };

  // Agentic Intent Parser
  const parseAgenticIntent = (text: string) => {
    const query = text.toLowerCase();
    if (query.includes("mail") || query.includes("email") || query.includes("contact") || query.includes("write")) {
      return 'email';
    }
    if (query.includes("book") || query.includes("schedule") || query.includes("meet") || query.includes("call") || query.includes("calendar")) {
      return 'schedule';
    }
    if (query.includes("project") || query.includes("work") || query.includes("portfolio")) {
      return 'projects';
    }
    if (query.includes("skill") || query.includes("stack") || query.includes("tech")) {
      return 'skills';
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const intent = parseAgenticIntent(userText);

    try {
      let botResponse = "";
      let draft: MailDraft | undefined;

      // 1. If agentic intent is detected, handle with specific actions or query HF
      if (intent === 'email') {
        botResponse = "I have drafted a contact email for you based on your prompt. Click the action button below to review and send it directly.";
        
        // Use Hugging Face to write email draft body based on user input
        try {
          const result = await hf.textGeneration({
            model: "Qwen/Qwen2.5-7B-Instruct",
            inputs: `<|im_start|>system\n${DHIDROID_GUIDE}\nDraft a professional email to Dhinesh. Be polite, clear, and direct. Output ONLY the drafted email body text. Do not wrap in chat formatting.<|im_end|>\n<|im_start|>user\nDraft mail for: ${userText}<|im_end|>\n<|im_start|>assistant\n`,
            parameters: { max_new_tokens: 150, temperature: 0.7 }
          });
          
          const cleanedText = result.generated_text.split("assistant\n").pop() || "Hi Dhinesh,\n\nI visited your portfolio and would like to discuss working together.\n\nBest regards,";
          draft = {
            to: "dhinesh4668@outlook.com",
            subject: "Portfolio Inquiry via DhiDroid Agent",
            body: cleanedText.trim()
          };
        } catch (e) {
          console.warn("HF Email drafting failed, using fallback:", e);
          draft = {
            to: "dhinesh4668@outlook.com",
            subject: "Portfolio Inquiry via DhiDroid Agent",
            body: `Hi Dhinesh,\n\nI would like to contact you regarding your full-stack development services.\n\nRef: ${userText}`
          };
        }
      } else if (intent === 'schedule') {
        botResponse = "I can guide you to schedule a meeting directly using Dhinesh's Cal.com calendar. Open the scheduler block below:";
      } else if (intent === 'projects') {
        botResponse = "Let's explore the Project showcase index. You can jump directly to Dhinesh's case studies:";
      } else if (intent === 'skills') {
        botResponse = "Retrieving Dhinesh's technical toolkit stack details. Here is the shortcut to view the skills page:";
      } else {
        // General text query - call Hugging Face
        try {
          const result = await hf.textGeneration({
            model: "Qwen/Qwen2.5-7B-Instruct",
            inputs: `<|im_start|>system\n${DHIDROID_GUIDE}\nAnswer the user's question about Dhinesh. Keep it brief (1-3 sentences) and highly professional.<|im_end|>\n<|im_start|>user\n${userText}<|im_end|>\n<|im_start|>assistant\n`,
            parameters: { max_new_tokens: 150, temperature: 0.7 }
          });
          
          botResponse = result.generated_text.split("assistant\n").pop()?.trim() || "";
        } catch (e) {
          console.warn("HF General Query failed, falling back to local/fallback responder:", e);
          // Fallback to local worker if ready
          if (isModelReady) {
            generateText(userText, DHIDROID_GUIDE, userMsg.id);
            return;
          } else {
            botResponse = "I'm currently running in standalone fallback mode. Dhinesh is a software engineer specialized in React Native, React, Go, and AWS. You can email him at dhinesh4668@outlook.com.";
          }
        }
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        actionType: intent || undefined,
        draft: draft
      }]);

    } catch (err) {
      console.error("Agentic chatbot handler error:", err);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I encountered a routing anomaly. Please reach out to Dhinesh directly at dhinesh4668@outlook.com.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-[#5235F6] text-white p-4 rounded-md transition-colors backdrop-blur-sm pointer-events-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={22} /> : <FiTerminal size={22} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-black/95 border border-[#5235F6]/30 rounded-md backdrop-blur-md overflow-hidden flex flex-col font-mono"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-[#5235F6]/10 p-3 border-b border-[#5235F6]/30 flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[#A99DFF] font-bold text-xs uppercase tracking-wider">DhiDroid Agent v5.0</span>
              </div>
              <span className="text-white text-[10px] opacity-60">HF DIRECT</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#5235F6]/40 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-sm text-xs ${msg.sender === 'user'
                        ? 'bg-[#5235F6]/20 text-white border border-[#5235F6]/30'
                        : 'bg-zinc-900/80 text-zinc-100 border border-zinc-800'
                      }`}
                  >
                    {msg.sender === 'bot' && <span className="text-[#5235F6] font-bold mr-1.5">{'>'}</span>}
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>
                  </div>

                  {/* Render Agentic Interactive Blocks */}
                  {msg.sender === 'bot' && msg.actionType === 'email' && msg.draft && (
                    <div className="w-[85%] mt-2 border border-[#5235F6]/40 bg-[#5235F6]/5 p-3 rounded-sm space-y-2 text-[10px]">
                      <div className="border-b border-[#5235F6]/20 pb-1 text-slate-400">
                        <span className="font-bold text-[#A99DFF]">TO:</span> {msg.draft.to}
                      </div>
                      <div className="border-b border-[#5235F6]/20 pb-1 text-slate-400">
                        <span className="font-bold text-[#A99DFF]">SUBJECT:</span> {msg.draft.subject}
                      </div>
                      <div className="bg-black/40 border border-zinc-800 p-2 text-zinc-300 font-sans leading-normal whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {msg.draft.body}
                      </div>
                      <button
                        onClick={() => handleSendMail(msg.draft!)}
                        className="w-full bg-[#5235F6] hover:bg-[#3F0BD9] text-white text-[10px] font-bold py-2 rounded-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FiMail className="w-3.5 h-3.5" /> Launch Mail Client
                      </button>
                    </div>
                  )}

                  {msg.sender === 'bot' && msg.actionType === 'schedule' && (
                    <div className="w-[85%] mt-2 border border-border bg-slate-50/5 dark:bg-zinc-900/5 p-3 rounded-sm text-[10px]">
                      <p className="text-slate-400 mb-2">Book a video discussion directly on Cal.com</p>
                      <button
                        onClick={() => { window.location.href = "/contact"; setIsOpen(false); }}
                        className="w-full bg-[#5235F6] hover:bg-[#3F0BD9] text-white text-[10px] font-bold py-2 rounded-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FiCalendar className="w-3.5 h-3.5" /> Book Call via Contact
                      </button>
                    </div>
                  )}

                  {msg.sender === 'bot' && msg.actionType === 'projects' && (
                    <div className="w-[85%] mt-2 border border-border bg-slate-50/5 dark:bg-zinc-900/5 p-3 rounded-sm text-[10px]">
                      <p className="text-slate-400 mb-2">Navigate directly to the Projects repository</p>
                      <button
                        onClick={() => { window.location.href = "/works"; setIsOpen(false); }}
                        className="w-full bg-[#5235F6] hover:bg-[#3F0BD9] text-white text-[10px] font-bold py-2 rounded-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FiBriefcase className="w-3.5 h-3.5" /> Explore Showcase
                      </button>
                    </div>
                  )}

                  {msg.sender === 'bot' && msg.actionType === 'skills' && (
                    <div className="w-[85%] mt-2 border border-border bg-slate-50/5 dark:bg-zinc-900/5 p-3 rounded-sm text-[10px]">
                      <p className="text-slate-400 mb-2">View full stack expertise details and certifications</p>
                      <button
                        onClick={() => { window.location.href = "/skills"; setIsOpen(false); }}
                        className="w-full bg-[#5235F6] hover:bg-[#3F0BD9] text-white text-[10px] font-bold py-2 rounded-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FiCpu className="w-3.5 h-3.5" /> Explore Tech Toolkit
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/80 p-3 rounded-sm border border-zinc-800 text-xs">
                    <span className="text-[#5235F6] font-bold mr-1.5">{'>'}</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#5235F6]/5 border-t border-[#5235F6]/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask DhiDroid a query..."
                className="flex-1 bg-black/50 border border-[#5235F6]/30 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5235F6] placeholder-zinc-600"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-[#5235F6] text-white p-2 rounded-sm hover:bg-[#3F0BD9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <FiSend size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
