import React, { useState } from 'react';
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaLink, 
  FaShareAlt 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogShareProps {
  title: string;
  url: string;
}

const BlogShare: React.FC<BlogShareProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const shareData = [
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#0A66C2] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8 border-y border-gray-100 my-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
            Share this article
        </h3>
        
        <div className="flex items-center gap-4">
            {/* Native Share (Mobile) */}
            <button
                onClick={handleNativeShare}
                className="md:hidden w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-all hover:bg-gray-100"
                aria-label="Share"
            >
                <FaShareAlt size={18} />
            </button>

            {/* Social Icons */}
            {shareData.map((platform) => (
                <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-all duration-300 ${platform.color}`}
                    aria-label={`Share on ${platform.name}`}
                >
                    <platform.icon size={18} />
                </a>
            ))}

            {/* Copy Link */}
            <div className="relative">
                <button
                    onClick={handleCopyLink}
                    className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-all hover:bg-gray-100 group"
                    aria-label="Copy Link"
                >
                    <FaLink size={18} className={copied ? "text-green-500" : ""} />
                </button>
                <AnimatePresence>
                    {copied && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap"
                        >
                            Copied!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </div>
  );
};

export default BlogShare;
