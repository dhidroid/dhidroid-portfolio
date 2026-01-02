import React from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";


const licenses = [
    {
        name: "MIT License",
        package: "React",
        description: "A permissive free software license originating at the Massachusetts Institute of Technology (MIT).",
        link: "https://opensource.org/licenses/MIT"
    },
    {
        name: "Apache-2.0",
        package: "TypeScript",
        description: "A permissive license whose main conditions require preservation of copyright and license notices.",
        link: "https://www.apache.org/licenses/LICENSE-2.0"
    },
    {
        name: "MIT License",
        package: "Tailwind CSS",
        description: "A utility-first CSS framework for rapidly building custom user interfaces.",
        link: "https://opensource.org/licenses/MIT"
    },
    {
        name: "MIT License",
        package: "Framer Motion",
        description: "A production-ready motion library for React.",
        link: "https://opensource.org/licenses/MIT"
    },
    {
        name: "MIT License",
        package: "Lucide React",
        description: "Beautiful & consistent icon toolkit made by the community.",
        link: "https://opensource.org/licenses/MIT"
    },
    {
        name: "MIT License",
        package: "Vite",
        description: "Next Generation Frontend Tooling.",
        link: "https://opensource.org/licenses/MIT"
    }
];

const Licenses = () => {
    return (
        <React.Fragment>
            <SEO title="Licenses | Dhidroid" description="Open source licenses and attributions." url="/licenses" />
            
            {/* Header */}
            <section className="pt-32 pb-24 bg-background border-b border-border/40">
                <Container className="text-center">
                    <Badge className="mb-6 rounded-none">Legal</Badge>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                        Licenses & <span className="text-primary">Attributions</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-sans">
                        We stand on the shoulders of giants. Here are the open source technologies that make this portfolio possible.
                    </p>
                </Container>
            </section>

            {/* Content - Using Pricing Grid Layout */}
            <section className="py-24 bg-background">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 max-w-7xl mx-auto border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-card">
                        {licenses.map((item, idx) => (
                             <div 
                                key={idx} 
                                className="p-10 flex flex-col hover:bg-muted/5 transition-colors duration-300"
                            >
                                <div className="mb-6">
                                    <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block">{item.name}</span>
                                    <h3 className="text-2xl font-display font-bold mb-3">{item.package}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                                </div>
                                
                                <a 
                                    href={item.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors"
                                >
                                    View License &rarr;
                                </a>
                             </div>
                        ))}
                    </div>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default Licenses;
