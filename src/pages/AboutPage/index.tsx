import React from 'react';
import SEO from '../../components/SEO';
import { generateMetaForRoute } from '../../utils/seo';
import AboutHero from '../../components/about/AboutHero';
import CoreValues from '../../components/about/CoreValues';
import ExperienceStats from '../../components/about/ExperienceStats';
import TechSphere from '../../components/about/TechSphere';
import WorkExperience from '../../components/home/WorkExperience';
import CTA from '../../components/home/CTA';
import { client } from "../../senity/senity";

const AboutPage = () => {
    const [workExpData, setWorkExpData] = React.useState<any[]>([]);

    const fetchWorkExperience = async () => {
        try {
            const query = `
            *[_type == "workExperience"]{
                company,
                title,
                location,
                tags,
                description,
                duration[]{ from, toDate }
            }`;
            const result = await client.fetch(query);

            let mappedData: any[] = [];

            if (result && result.length > 0) {
                const sortedData = result.sort((a: any, b: any) => {
                    const dateA = new Date(a.duration?.[0]?.from || 0).getTime();
                    const dateB = new Date(b.duration?.[0]?.from || 0).getTime();
                    return dateB - dateA;
                });

                mappedData = sortedData.map((item: any) => {
                    const startYear = item.duration?.[0]?.from ? new Date(item.duration[0].from).getFullYear() : '';
                    const endYear = item.duration?.[0]?.toDate ? new Date(item.duration[0].toDate).getFullYear() : 'Present';
                    const period = startYear ? `${startYear} - ${endYear}` : '';

                    return {
                        id: item._id || item.company,
                        company: item.company,
                        role: item.title,
                        period: period,
                        location: item.location,
                        tags: item.tags,
                        achievements: item.description ? [item.description] : []
                    };
                });
            } else {
                // Fallback Data from User Request if CMS is empty
                mappedData = [
                    {
                        id: "natobotics",
                        company: "Natobotics Technology Pvt. Ltd.",
                        role: "React Native Developer",
                        period: "2024 - Present",
                        location: "Chennai, India",
                        tags: ["React Native", "Android", "iOS", "Typescript", "App Development", "Full Stack"],
                        achievements: ["Building scalable digital products.", "Cross-platform mobile application development."]
                    },
                    {
                        id: "freelance",
                        company: "Fiverr & Upwork",
                        role: "Full Stack Development",
                        period: "2024",
                        location: "Remote",
                        tags: ["Full Stack", "Mobile App Development", "Web Development", "UI/UX"],
                        achievements: ["Delivering high-quality web and mobile solutions for global clients."]
                    },
                    {
                        id: "algojaxon",
                        company: "Algojaxon Global Soft",
                        role: "Full Stack & Mobile App Dev",
                        period: "2023",
                        location: "Salem, TamilNadu",
                        tags: ["MERN Stack", "React Native", "Android", "iOS"],
                        achievements: ["Developed full stack web and mobile applications."]
                    }
                ];
            }

            setWorkExpData(mappedData);
        } catch (error) {
            console.error(error);
            // On Error, also use fallback to ensure UI shows
            setWorkExpData([
                {
                    id: "natobotics",
                    company: "Natobotics Technology Pvt. Ltd.",
                    role: "React Native Developer",
                    period: "2024 - Present",
                    location: "Chennai, India",
                    tags: ["React Native", "Android", "iOS", "Typescript"],
                    achievements: []
                },
                {
                    id: "freelance",
                    company: "Fiverr & Upwork",
                    role: "Full Stack Development",
                    period: "2024",
                    location: "Remote",
                    tags: ["Full Stack", "React", "Node"],
                    achievements: []
                },
                {
                    id: "algojaxon",
                    company: "Algojaxon Global Soft",
                    role: "Full Stack & Mobile App Dev",
                    period: "2023",
                    location: "Salem, TamilNadu",
                    tags: ["MERN", "Mobile"],
                    achievements: []
                }
            ]);
        }
    };

    React.useEffect(() => {
        fetchWorkExperience();
    }, []);

    return (
        <React.Fragment>
            <SEO
                {...generateMetaForRoute('/about')}
            />

            <main className="bg-white min-h-screen">
                <AboutHero />
                <ExperienceStats />
                <TechSphere />
                <CoreValues />

                {workExpData.length > 0 && (
                    <div className="pt-24 bg-gray-50 border-t border-gray-100">
                        <WorkExperience experiences={workExpData} />
                    </div>
                )}
            </main>

            <CTA />
        </React.Fragment>
    );
};

export default AboutPage;