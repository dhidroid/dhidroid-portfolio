import React, { useEffect } from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { getCalApi } from "@calcom/embed-react";
import { Badge } from "../../components/ui/Badge";

const SchedulePage = () => {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", { "styles": { "branding": { "brandColor": "#5315FC" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    return (
        <React.Fragment>
             <SEO
                title="Schedule a Meeting | Dhidroid"
                description="Book a consultation call."
                route="/schedule"
            />
             <section className="pt-32 pb-12 bg-gray-50 border-b border-gray-200">
                <Container className="text-center">
                    <Badge className="mb-6">Contact</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Let's <span className="text-primary">Talk</span>
                    </h1>
                     <p className="max-w-2xl mx-auto text-lg text-gray-500">
                        Schedule a 30-minute consultation to discuss your project.
                    </p>
                </Container>
            </section>

             <section className="py-12 bg-white min-h-[600px]">
                <Container>
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div 
                             style={{ width: "100%", height: "100%", overflow: "scroll" }}
                             id="my-cal-inline"
                        >
                            <button
                                data-cal-namespace="30min"
                                data-cal-link="dhidroid/30min"
                                data-cal-config='{"layout":"month_view"}'
                                className="w-full h-full min-h-[600px]"
                            />
                        </div>
                    </div>
                </Container>
             </section>
        </React.Fragment>
    );
};

export default SchedulePage;
