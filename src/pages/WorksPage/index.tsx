import React from "react";
import SEO from "../../components/SEO";
import WorksIntro from "../../components/project/WorksIntro";
import ProjectGrid from "../../components/project/ProjectGrid";
import { PERSONAL_INFO } from "../../config/personal";

const WorksPage = () => {
    return (
        <React.Fragment>
            <SEO
                title={`Selected Work | ${PERSONAL_INFO.name}`}
                description="A curated selection of my best work in design engineering, branding, and web development."
                keywords={["portfolio", "projects", "web design", "developer", "case studies"]}
                url='/works'
            />
            <main className="bg-white min-h-screen">
                <WorksIntro />
                <ProjectGrid />
            </main>
        </React.Fragment>
    );
};

export default WorksPage;
