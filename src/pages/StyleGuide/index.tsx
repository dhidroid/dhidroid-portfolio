import React from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

const StyleGuide = () => {
    return (
        <React.Fragment>
            <SEO title="Style Guide | Dhidroid" description="Design system and visual guidelines." url="/style-guide" />
            
            {/* Header */}
            <section className="pt-32 pb-24 bg-background border-b border-border/40">
                <Container className="text-center">
                    <Badge className="mb-6 rounded-none">System</Badge>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                        Style <span className="text-primary">Guide</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-sans">
                        The visual language and core components that power the Dhidroid portfolio.
                    </p>
                </Container>
            </section>

            {/* Content */}
            <section className="py-24 bg-background">
                <Container>
                    <div className="flex flex-col gap-24">
                        
                        {/* Colors */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-display font-bold border-b border-border/40 pb-4">Colors</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-3">
                                    <div className="h-24 w-full bg-primary border border-border/20 shadow-sm" />
                                    <p className="font-mono text-sm">Primary</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-24 w-full bg-background border border-border/20 shadow-sm" />
                                    <p className="font-mono text-sm">Background</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-24 w-full bg-foreground border border-border/20 shadow-sm" />
                                    <p className="font-mono text-sm">Foreground</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-24 w-full bg-muted border border-border/20 shadow-sm" />
                                    <p className="font-mono text-sm">Muted</p>
                                </div>
                            </div>
                        </div>

                        {/* Typography */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-display font-bold border-b border-border/40 pb-4">Typography</h2>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h1 className="text-6xl font-display font-bold">Heading 1</h1>
                                    <h2 className="text-5xl font-display font-bold">Heading 2</h2>
                                    <h3 className="text-4xl font-display font-bold">Heading 3</h3>
                                    <h4 className="text-3xl font-display font-bold">Heading 4</h4>
                                    <h5 className="text-2xl font-display font-bold">Heading 5</h5>
                                    <h6 className="text-xl font-display font-bold">Heading 6</h6>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        Body Large — The quick brown fox jumps over the lazy dog. A sentence that covers all letters of the alphabet.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-600">
                                        Body Base — The quick brown fox jumps over the lazy dog. Used for standard text blocks and descriptions.
                                    </p>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        Body Small — The quick brown fox jumps over the lazy dog. Used for captions and metadata.
                                    </p>
                                    <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
                                        Caption / Label
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-display font-bold border-b border-border/40 pb-4">Buttons</h2>
                            <div className="flex flex-wrap gap-6 items-center">
                                <Button size="lg">Primary Large</Button>
                                <Button variant="outline" size="lg">Outline Large</Button>
                                <Button variant="ghost" size="lg">Ghost Large</Button>
                                <Button>Default</Button>
                                <Button size="sm">Small</Button>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default StyleGuide;
