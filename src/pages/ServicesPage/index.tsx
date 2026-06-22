import React from "react";
import SEO from "../../components/SEO";
import ServicesHero from "../../components/services/ServicesHero";
import ServiceList from "../../components/services/ServiceList";
import ServiceFAQ from "../../components/services/ServiceFAQ";
import CTA from "../../components/home/CTA";
import { generateMetaForRoute } from "../../utils/seo";

const ServicesPage = () => {
    return (
        <React.Fragment>
            <SEO
                {...generateMetaForRoute('/services')}
            />
            
            <main className="bg-background min-h-screen">
                <ServicesHero />
                <ServiceList />
                <ServiceFAQ />
            </main>

            <CTA />
        </React.Fragment>
    );
};

export default ServicesPage;
