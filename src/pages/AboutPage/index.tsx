import React from 'react';
import SEO from '../../components/SEO';
import { generateMetaForRoute } from '../../utils/seo';
import AboutHero from '../../components/about/AboutHero';
import AboutStats from '../../components/about/AboutStats';
import WorkExperience from '../../components/home/WorkExperience';
import CTA from '../../components/home/CTA';
import { client } from "../../senity/senity";
import { Container } from "../../components/ui/Container";
import FlipProfileCard from '../../components/Cards/FipCard/FlipCard'; // Keeping this for now or could refactor
import { useAI } from '../../context/AIContext';

const AboutPage = () => {
    const { worker, loadingProgress, generateText } = useAI();
    const [aiBio, setAiBio] = React.useState<string>("");
    const [workExpData, setWorkExpData] = React.useState<any[]>([]);

    // Portfolio Context for Bio
    const bioContext = `
    Name: DhineshKumar Thirupathi
    Role: Full Stack Developer
    Company: Natobotics
    Skills: React Native, React, Node.js, Firebase, AWS, Go, Kotlin, Swift
    Experience: 3+ years building scalable mobile and web apps.
    `;

    React.useEffect(() => {
        if (worker) {
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

    const fetchWorkExperience = async () => {
        try {
            const query = `
            *[_type == "workExperience"]{
                company,
                title,
                location,
                tags,
                description, // Assuming description exists or achievements
                duration[]{ from, toDate }
            }`;
            const result = await client.fetch(query);
            const sortedData = result.sort((a: any, b: any) => {
                const dateA = new Date(a.duration?.[0]?.from || 0).getTime();
                const dateB = new Date(b.duration?.[0]?.from || 0).getTime();
                return dateB - dateA;
            });

            // Map to new ExperienceItem interface
            const mappedData = sortedData.map((item: any) => {
                const startYear = item.duration?.[0]?.from ? new Date(item.duration[0].from).getFullYear() : '';
                const endYear = item.duration?.[0]?.toDate ? new Date(item.duration[0].toDate).getFullYear() : 'Present';
                const period = startYear ? `${startYear} - ${endYear}` : '';

                return {
                    id: item._id || item.company,
                    company: item.company,
                    role: item.title, // Map title to role
                    period: period,
                    location: item.location,
                    tags: item.tags,
                    achievements: item.description ? [item.description] : [] // Use description as achievement if available
                };
            });

            setWorkExpData(mappedData);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        fetchWorkExperience();
    }, []);

    return (
        <React.Fragment>
            <SEO
                title={generateMetaForRoute('/about').title}
                description={generateMetaForRoute('/about').description}
                keywords={generateMetaForRoute('/about').keywords}
                route="/about"
                structuredData={generateMetaForRoute('/about').structuredData}
            />

            <AboutHero />
            <AboutStats />

            <section className="py-24 bg-white">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <div className="relative">
                                {/* Using existing FlipCard component but might need container adjustment */}
                                <div className="max-w-md mx-auto">
                                    <FlipProfileCard />
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">Who is <span className="text-primary">DhineshKumar?</span></h2>

                            {/* AI Bio Section */}
                            <div className="mb-8 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary">AI Generated Bio</span>
                                </div>

                                {loadingProgress !== null && !aiBio ? (
                                    <div className="space-y-2">
                                        <div className="text-xs text-gray-400 font-mono">Generating Bio... {loadingProgress}%</div>
                                        <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                                            <div
                                                className="bg-primary h-full transition-all duration-300"
                                                style={{ width: `${loadingProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="prose prose-lg text-gray-600">
                                        <p>{aiBio || "Initializing AI..."}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {workExpData.length > 0 && <WorkExperience experiences={workExpData} />}

            <CTA />
        </React.Fragment>
    );
};

export default AboutPage;