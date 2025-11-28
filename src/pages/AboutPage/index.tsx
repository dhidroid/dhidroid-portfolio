import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import styles from './styles/AboutPage.module.css';
import SEO from '../../components/SEO';
import FlipProfileCard from '../../components/Cards/FipCard/FlipCard';
import { FiCpu } from 'react-icons/fi';
import { useAI } from '../../context/AIContext';

const AboutPage = () => {
    const { worker, loadingProgress, generateText } = useAI();
    const [aiBio, setAiBio] = useState<string>("");

    // Portfolio Context for Bio
    const bioContext = `
    Name: DhineshKumar Thirupathi
    Role: Full Stack Developer
    Company: Natobotics
    Skills: React Native, React, Node.js, Firebase, AWS, Go, Kotlin, Swift
    Experience: 3+ years building scalable mobile and web apps.
    `;

    useEffect(() => {
        if (worker) {
            // Check if we already have a bio generated? 
            // Or just generate one on mount if empty
            if (!aiBio) {
                generateText(
                    "Write a professional yet creative 2-paragraph bio for my portfolio.",
                    bioContext,
                    "about_bio"
                );
            }

            const onMessage = (e: MessageEvent) => {
                const { status, output, id } = e.data;
                if (status === 'complete' && id === 'about_bio') {
                    setAiBio(output);
                }
            };

            worker.addEventListener('message', onMessage);
            return () => worker.removeEventListener('message', onMessage);
        }
    }, [worker, aiBio, generateText, bioContext]);

    const stats = [
        { number: "3+", label: "Years Experience" },
        { number: "10+", label: "Projects Completed" },
        { number: "5+", label: "Happy Clients" },
        { number: "24/7", label: "Support" }
    ];

    return (
        <React.Fragment>
            <SEO
                title="About DhineshKumar - Full Stack Developer"
                description="Learn more about DhineshKumar Thirupathi, a passionate Full Stack Developer specializing in React Native, React, and Node.js."
                keywords={["About Me", "DhineshKumar", "Developer Bio", "Experience", "Natobotics"]}
            />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.header}
                    >
                        <h1 className={styles.title}>
                            About <span className={styles.highlight}>Me</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Passionate about creating seamless digital experiences and solving complex problems with code.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.imageContainer}
                    >
                        <div className="relative z-10 w-full max-w-md">
                            <FlipProfileCard />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.contentContainer}
                    >
                        <h2 className={styles.title}>About Me</h2>

                        {/* AI Bio Section */}
                        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <FiCpu className="text-[#5315FC] text-xl" />
                                <span className="text-sm font-mono text-[#5315FC]">AI Generated Bio</span>
                            </div>

                            {loadingProgress !== null && !aiBio ? (
                                <div className="space-y-2">
                                    <div className="text-xs text-gray-400 font-mono">Loading AI Model... {loadingProgress}%</div>
                                    <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#5315FC] h-full transition-all duration-300"
                                            style={{ width: `${loadingProgress}%` }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="whitespace-pre-wrap font-mono text-sm md:text-base text-gray-300 leading-relaxed">
                                    {aiBio || "Initializing AI..."}
                                </div>
                            )}
                        </div>

                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-2xl font-bold text-[#5315FC] mb-1">{stat.number}</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AboutPage;