import React from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { Monitor, Smartphone, PenTool, Rocket } from "lucide-react";
import CTA from "../../components/home/CTA";

const services = [
    {
        title: "Web Development",
        icon: Monitor,
        description: "Custom websites and web applications built with React, Next.js, and modern tech stack. SEO optimized and performance focused.",
        features: ["Single Page Applications", "E-commerce Platforms", "CMS Integration", "Progressive Web Apps"]
    },
    {
        title: "Mobile App Development",
        icon: Smartphone,
        description: "Native and cross-platform mobile applications for iOS and Android using React Native, Swift, and Kotlin.",
        features: ["iOS & Android", "Cross-Platform", "App Store Deployment", "Optimization"]
    },
    {
        title: "UI/UX Design",
        icon: PenTool,
        description: "User-centric design solutions that enhance engagement and usability. Prototyping and design systems.",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
        title: "Technical Consulting",
        icon: Rocket,
        description: "Expert advice on technology strategy, architecture planning, and digital transformation.",
        features: ["Architecture Planning", "Code Review", "Performance Audits", "Tech Strategy"]
    }
];

const ServicesPage = () => {
    return (
        <React.Fragment>
             <SEO
                title="Services | Dhidroid"
                description="Professional web and mobile development services."
                route="/services"
            />
            
             <section className="pt-32 pb-24 bg-gray-900 text-white">
                <Container className="text-center">
                    <Badge variant="outline" className="mb-6 text-white border-white/20">What I Do</Badge>
                     <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Premium <span className="text-primary">Services</span> <br/> for your digital needs
                    </h1>
                </Container>
             </section>

             <section className="py-24 bg-white">
                 <Container>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {services.map((service, index) => (
                             <div key={index} className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                     <service.icon size={24} />
                                 </div>
                                 <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                                 <p className="text-gray-600 mb-8 leading-relaxed">
                                     {service.description}
                                 </p>
                                 <ul className="space-y-3">
                                     {service.features.map(feature => (
                                         <li key={feature} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                             {feature}
                                         </li>
                                     ))}
                                 </ul>
                             </div>
                         ))}
                     </div>
                 </Container>
             </section>

             <CTA />
        </React.Fragment>
    );
};

export default ServicesPage;
