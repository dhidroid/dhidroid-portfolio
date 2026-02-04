import React, { useState } from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { Send } from "lucide-react";
import { client } from "../../senity/senity";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

interface NewsletterProps {
  className?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 1. Save to Sanity
      // await client.create({
      //   _type: "subscriber",
      //   email: email,
      //   subscribedAt: new Date().toISOString(),
      // });

      // 2. Send Confirmation Email via EmailJS (Optional: "Welcome to the newsletter")
      const SERVICE_ID = "service_4t5cmkp";
      const TEMPLATE_ID = "template_89p59n8";
      const PUBLIC_KEY = "BbS4r6xVZEXKBKUPr";


      if (SERVICE_ID !== "service_4t5cmkp") {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            email: email, 
            message: "Welcome to the Dhidroid Newsletter!",
          },
          PUBLIC_KEY
        );
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className={className}>
      <Container>
        <div className={`border-t border-b border-gray-200 py-16 min-h-[300px] flex items-center justify-center`}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center"
              >
                <h3 className="text-[8vw] md:text-[6rem] font-display font-bold uppercase tracking-tighter leading-none mb-4">
                  You're <span className="text-primary italic">In.</span>
                </h3>
                <p className="font-mono text-sm uppercase tracking-[0.4em] text-gray-500">Welcome to the inner circle.</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col md:flex-row items-center justify-between gap-12"
              >
                <div className="max-w-md">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4 text-center md:text-left">Stay Updated</p>
                  <h3 className="text-3xl font-display font-bold uppercase tracking-tight text-center md:text-left">
                    Join the <span className="text-primary italic">Newsletter</span>
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-xl group">
                  <div className="relative flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="YOUR EMAIL ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === "loading"}
                      className="flex-grow bg-gray-50 border border-gray-200 px-8 py-4 text-sm font-mono uppercase tracking-widest focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-gray-300 disabled:opacity-50"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={status === "loading"}
                      className="rounded-none h-14 px-10 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform"
                    >
                      Subscribe <Send size={14} strokeWidth={2.5} />
                    </Button>
                  </div>
                  <p className="mt-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest text-center md:text-left">
                    {status === "error" ? "Something went wrong. Try again." : "No Spam. Only Project updates & Design Insights."}
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
};
