import React from "react";
import SEO from "../../components/SEO";
import WorksIntro from "../../components/project/WorksIntro";
import ProjectGrid from "../../components/project/ProjectGrid";
import { generateMetaForRoute } from "../../utils/seo";

const WorksPage = () => {
    return (
        <React.Fragment>
            <SEO
                {...generateMetaForRoute('/works')}
            />
            <main className="bg-white min-h-screen">
                <WorksIntro />
                <ProjectGrid />
            </main>
        </React.Fragment>
    );
};

export default WorksPage;
