import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

const WhatsAppWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "+919150507538";
    const message = "Hello, I'm interested in your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-72 relative"
                    >
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes />
                        </button>

                        <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Chat with Me!</h3>
                            <p className="text-sm text-gray-500 mb-4">Scan to chat on WhatsApp</p>
                            
                            <div className="bg-gray-50 p-3 rounded-xl inline-block mb-4 border border-gray-100">
                                <QRCodeSVG value={whatsappUrl} size={150} />
                            </div>

                            <a 
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold hover:bg-[#128C7E] transition-colors"
                            >
                                <FaWhatsapp size={20} />
                                Open WhatsApp
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] relative group"
            >
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                {isOpen ? <FaTimes size={28} /> : <FaWhatsapp size={28} />}
            </button>
        </div>
    );
};

export default WhatsAppWidget;
