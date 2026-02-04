import React from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Mail, MessageSquare, Calendar, ExternalLink, Instagram, MessageCircleMore, Send } from "lucide-react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaMediumM } from "react-icons/fa";

import { Link } from "react-router";
import { cn } from "../../utils/cn";
import { generateMetaForRoute } from "../../utils/seo";
import { IconContainer } from "../../components/ui/IconContainer";
import { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../utils/motion";
import { Newsletter } from "../../components/ui/Newsletter";
import emailjs from "@emailjs/browser";


(async function () {
    const cal = await getCalApi({ "namespace": "30min" });
    cal("floatingButton", { "calLink": "dhidroid/30min", "config": { "layout": "month_view" } });
    cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
})();


const contactMethods = [
    {
        name: "General Inquiries",
        value: "dhinesh4668@outlook.com",
        description: "For new projects, collaborations, or just to say hello.",
        icon: Mail,
        action: {
            label: "Send Email",
            href: "mailto:dhinesh4668@outlook.com"
        }
    },
    {
        name: "Book my call",
        value: "30-min Consultation",
        popular: true,
        description: "Schedule a discovery call to discuss your project in detail.",
        icon: Calendar,
        action: {
            label: "Book my call",
            href: "/schedule"
        }
    },
    {
        name: "Quick Chat",
        value: "Social Channels",
        description: "Connect with me on social media for quick questions or updates.",
        icon: MessageSquare,
        action: {
            label: "Connect on LinkedIn",
            href: "https://linkedin.com/in/dhidroid-rndev"
        }
    },
    {
        name: "Social",
        value: "Social Channels",
        description: "Connect with me on social media for quick questions or updates.",
        icon: Instagram,
        action: {
            label: "Connect on Instagram",
            href: "https://instagram.com/dhidroid"
        }
    },
    {
        name: "Quick Chat",
        value: "Social Channels",
        description: "Connect with me on whatsapp for quick questions or updates.",
        icon: MessageCircleMore,
        action: {
            label: "Connect on whatsapp",
            href: "https://wa.me/919150507538"
        }
    },
    {
        name: "Blog",
        value: "Blog",
        description: "Read about my projects and experiences.",
        icon: FaMediumM,
        action: {
            label: "Read Blog",
            href: "https://medium.com/@dhidroid"
        }
    }
];

const socialLinks = [
    { icon: FaGithub, href: "https://github.com/dhinesh", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/dhidroid-rndev", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://x.com/@dhidroid", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com/dhidroid", label: "Instagram" }
];

import { client } from "../../senity/senity";

const ContactForm = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            // 1. Save to Sanity
            await client.create({
                _type: "message",
                ...formData,
                createdAt: new Date().toISOString()
            });

            // 2. Send Email via EmailJS
            // Replace these with your actual Service ID, Template ID, and Public Key
            // You can find these in your EmailJS dashboard: https://dashboard.emailjs.com/
            const SERVICE_ID = "service_4t5cmkp";
            const TEMPLATE_ID = "template_89p59n8";
            const PUBLIC_KEY = "BbS4r6xVZEXKBKUPr";

            // Only send if keys are configured (to avoid errors in dev if not set)

            await emailjs.send(
                'service_4t5cmkp',
                'template_89p59n8',
                {
                    title: formData.subject,
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    time: new Date().toLocaleString()
                }
            );

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-24 text-center border-t border-gray-100"
            >
                <h3 className="text-[8vw] md:text-[8rem] font-display font-bold uppercase tracking-tighter leading-none mb-12">
                    Message<br />
                    <span className="text-primary italic">Sent.</span>
                </h3>
                <p className="font-mono text-sm uppercase tracking-[0.4em] text-gray-500 mb-12">I'll get back to you shortly.</p>
                <Button variant="outline" onClick={() => setStatus("idle")} className="rounded-none uppercase tracking-widest font-bold">Send Another</Button>
            </motion.div>
        );
    }

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6">Inquiry Form</p>
                        <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-8">Send a <span className="text-primary italic">Detailed</span> Message</h2>
                        <p className="text-gray-500 leading-relaxed font-light">
                            Fill out the form to help me understand your project better. For urgent matters, please use the direct WhatsApp link.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="flex flex-col gap-4 group">
                                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-primary transition-colors">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="JOHN DOE"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-transparent border-b border-gray-200 py-4 text-2xl font-display font-bold uppercase placeholder:text-gray-100 focus:outline-none focus:border-primary transition-all rounded-none"
                                />
                            </div>
                            <div className="flex flex-col gap-4 group">
                                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-primary transition-colors">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="HELLO@EXAMPLE.COM"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-transparent border-b border-gray-200 py-4 text-2xl font-display font-bold uppercase placeholder:text-gray-100 focus:outline-none focus:border-primary transition-all rounded-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 group">
                            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-primary transition-colors">Subject</label>
                            <input
                                type="text"
                                required
                                placeholder="PROJECT INQUIRY"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="bg-transparent border-b border-gray-200 py-4 text-2xl font-display font-bold uppercase placeholder:text-gray-100 focus:outline-none focus:border-primary transition-all rounded-none"
                            />
                        </div>
                        <div className="flex flex-col gap-4 group">
                            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-primary transition-colors">Message</label>
                            <textarea
                                required
                                rows={4}
                                placeholder="TELL ME ABOUT YOUR PROJECT..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="bg-transparent border-b border-gray-200 py-4 text-2xl font-display font-bold uppercase placeholder:text-gray-100 focus:outline-none focus:border-primary transition-all rounded-none resize-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={status === "loading"}
                                className="rounded-none h-20 px-16 text-sm font-bold uppercase tracking-[0.3em] group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Send Message <Send size={18} />
                                </span>
                            </Button>
                        </div>
                        {status === "error" && <p className="text-red-500 font-mono text-xs uppercase tracking-widest text-right">Something went wrong. Please check your connection.</p>}
                    </form>
                </div>
            </Container>
        </section>
    );
};

const ContactPage = () => {
    return (
        <React.Fragment>
            <SEO
                {...generateMetaForRoute('/contact')}
            />

            <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 bg-white">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge className="mb-8 rounded-none px-4 py-1">Connect</Badge>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-[12vw] md:text-[8rem] leading-[0.85] font-bold font-display tracking-tighter text-foreground uppercase mb-12"
                        >
                            Get in<br />
                            <span className="text-gray-300 italic">Touch.</span>
                        </motion.h1>

                        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 md:items-start border-t border-gray-100 pt-12 mt-12">
                            <span className="font-mono text-sm uppercase tracking-widest text-gray-400 md:w-64">General inquiries</span>
                            <div className="max-w-2xl">
                                <p className="text-xl md:text-3xl text-gray-800 leading-tight font-light mb-8">
                                    Have a vision you want to bring to life? I specialize in transforming complex ideas into high-fidelity digital products.
                                </p>
                                <div className="flex flex-wrap gap-8">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Response Time</span>
                                        <span className="text-sm font-bold uppercase tracking-tight">~24 Hours</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Local Time</span>
                                        <span className="text-sm font-bold uppercase tracking-tight">IST (GMT +5:30)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Social Channels Section */}
            <div className="bg-white py-24 border-b border-gray-100">
                <Container>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em] mb-12">Social Channels</p>
                        <div className="flex flex-wrap justify-center gap-16 md:gap-24">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 transition-all"
                                >
                                    <IconContainer size="sm" animate={false} className="group-hover:bg-primary group-hover:border-primary text-gray-400 group-hover:text-white transition-all">
                                        <social.icon strokeWidth={0.5} />
                                    </IconContainer>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 group-hover:text-primary transition-colors">
                                            {social.label}
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-tight flex items-center gap-1 mt-0.5 group-hover:translate-x-1 transition-transform">
                                            Follow <ExternalLink size={10} strokeWidth={3} />
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-card">
                        {contactMethods.map((method) => (
                            <div
                                key={method.name}
                                className={cn(
                                    "relative p-12 flex flex-col hover:bg-muted/5 transition-all duration-500 group",
                                    method.popular && "bg-muted/5"
                                )}
                            >
                                {method.popular && (
                                    <div className="absolute top-0 left-0 w-full bg-primary/10 border-b border-primary/20 text-primary text-[10px] font-bold font-mono py-1.5 text-center uppercase tracking-widest">
                                        Recommended
                                    </div>
                                )}

                                <div className={cn("mb-10 flex flex-col items-start gap-6", method.popular && "mt-8")}>
                                    <IconContainer size="lg" variant="filled">
                                        <method.icon />
                                    </IconContainer>
                                    <div>
                                        <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-1">{method.name}</h3>
                                        <p className="text-primary text-xs font-mono uppercase tracking-widest">{method.value}</p>
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-12 flex-grow font-sans">
                                    {method.description}
                                </p>

                                {method.action.href.startsWith('http') || method.action.href.startsWith('mailto') ? (
                                    <a href={method.action.href} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant={method.popular ? "primary" : "outline"}
                                            className="w-full rounded-none h-14 text-sm font-bold uppercase tracking-widest"
                                        >
                                            {method.action.label}
                                        </Button>
                                    </a>
                                ) : (
                                    <Link to={method.action.href}>
                                        <Button
                                            variant={method.popular ? "primary" : "outline"}
                                            className="w-full rounded-none h-14 text-sm font-bold uppercase tracking-widest"
                                        >
                                            {method.action.label}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <ContactForm />
        </React.Fragment>
    );
};

export default ContactPage;
