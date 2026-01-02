import React from "react";
import SEO from "../../components/SEO";
import ServicesHero from "../../components/services/ServicesHero";
import ServiceList from "../../components/services/ServiceList";
import ServiceFAQ from "../../components/services/ServiceFAQ";
import CTA from "../../components/home/CTA";
import { PERSONAL_INFO } from "../../config/personal"; // Correct path

const ServicesPage = () => {
    return (
        <React.Fragment>
            <SEO
                title={`Services | ${PERSONAL_INFO.name}`}
                description="Professional web development and design services tailored to your needs."
                url="/services"
            />
            
            <main className="bg-white min-h-screen">
                <ServicesHero />
                <ServiceList />
                <ServiceFAQ />
            </main>

            <CTA />
        </React.Fragment>
    );
};

export default ServicesPage;
