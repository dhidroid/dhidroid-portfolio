import React, { useEffect, useState } from "react";
import { Container } from "../ui/Container";
import StatsCard from "./StatsCard";
import { client } from "../../senity/senity";

const ExperienceStats = () => {
    const [stats, setStats] = useState({
        experience: "1 +",
        projects: "19+",
        awards: "08"
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const query = `
                {
                    "projects": count(*[_type == "project"]),
                    "experience": count(*[_type == "workExperience"]), 
                    "awards": count(*[_type == "award"])
                }`;
                
                const data = await client.fetch(query);
                
                setStats({
                    experience: "1 +", 
                    projects: data.projects > 19 ? `${data.projects}+` : "19+",
                    awards: data.awards > 0 ? `${data.awards.toString().padStart(2, '0')}` : "05" 
                });

            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <section className="py-24 bg-background border-t border-slate-200 dark:border-zinc-800">
            <Container className="px-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <StatsCard 
                        title="EXPERIENCE"
                        value={stats.experience}
                        subtitle="Years of building scalable digital products."
                        variant="lines"
                        index={0}
                    />

                    <StatsCard 
                        title="PROJECTS"
                        value={stats.projects}
                        subtitle="Successfully delivered mobile and web apps."
                        variant="grid"
                        index={3}
                    />

                    <StatsCard 
                        title="AWARDS"
                        value={stats.awards}
                        subtitle="Recognition for design and engineering excellence."
                        variant="radar"
                        index={2}
                    />

                 </div>
            </Container>
        </section>
    );
};

export default ExperienceStats;
