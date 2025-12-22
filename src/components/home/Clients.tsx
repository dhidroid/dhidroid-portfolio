import React from "react";
import { Container } from "../ui/Container";
import { PortfolioContent } from "../../utils/Data/portfolioContent";

const Clients = () => {
    const { clients } = PortfolioContent;

    return (
        <section className="py-12 border-b border-gray-100 bg-gray-50/50">
            <Container>
                <p className="text-center text-sm font-semibold text-gray-500 mb-8 uppercase tracking-wider">
                    Trusted by innovative companies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 grayscale opacity-50">
                    {clients.map((client) => (
                        <span key={client.name} className="text-xl font-bold font-sans text-gray-400 hover:text-gray-900 transition-colors">
                            {client.name}
                        </span>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Clients;
