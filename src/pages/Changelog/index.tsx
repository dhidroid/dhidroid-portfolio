import React, { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { Check, Zap, Bug, Star, GitCommit, Calendar, Loader2 } from "lucide-react";

interface CommitAuthor {
    name: string;
    date: string;
}

interface CommitInfo {
    message: string;
    author: CommitAuthor;
}

interface GitHubCommit {
    sha: string;
    commit: CommitInfo;
    html_url: string;
}

interface ChangelogItem {
    type: string;
    text: string;
    hash: string;
    url: string;
}

interface ChangelogGroup {
    version: string; // Using Date as version/title
    date: string;
    label: string;
    type: string;
    items: ChangelogItem[];
}

const fallbackChanges: ChangelogGroup[] = [
    {
        version: "v2.0.0",
        date: "January 2026",
        label: "Major Release",
        type: "major",
        items: [
            { type: "feat", text: "Complete Redesign with new Branding", hash: "FEAT", url: "#" },
            { type: "feat", text: "Added 3D Tech Sphere Visualization", hash: "FEAT", url: "#" },
            { type: "feat", text: "Integrated Sanity CMS for Blog & Experience", hash: "FEAT", url: "#" },
            { type: "fix", text: "Improved SEO and Semantic HTML", hash: "FIX", url: "#" },
            { type: "feat", text: "Added Interactive Skills Page", hash: "FEAT", url: "#" }
        ]
    },
    {
        version: "v1.5.0",
        date: "December 2025",
        label: "Performance",
        type: "minor",
        items: [
            { type: "perf", text: "Optimized image loading with lazy-load", hash: "PERF", url: "#" },
            { type: "feat", text: "Added Dark Mode foundations", hash: "FEAT", url: "#" },
            { type: "fix", text: "Fixed mobile navigation z-index issues", hash: "FIX", url: "#" }
        ]
    },
    {
        version: "v1.0.0",
        date: "November 2025",
        label: "Initial Launch",
        type: "init",
        items: [
            { type: "feat", text: "Initial Portfolio Launch", hash: "INIT", url: "#" },
            { type: "feat", text: "Home, About, and Works pages", hash: "FEAT", url: "#" },
            { type: "feat", text: "Contact Form integration", hash: "FEAT", url: "#" }
        ]
    }
];

const Changelog = () => {
    const [changes, setChanges] = useState<ChangelogGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);

    const getIcon = (type: string) => {
        switch(type) {
            case "feat": return <Star size={16} className="text-primary" />;
            case "fix": return <Bug size={16} className="text-orange-500" />;
            case "perf": return <Zap size={16} className="text-blue-500" />;
            case "chore": return <GitCommit size={16} className="text-gray-400" />;
            default: return <Check size={16} className="text-green-500" />;
        }
    };

    const getTypeFromMessage = (message: string) => {
        if (message.startsWith("feat")) return "feat";
        if (message.startsWith("fix")) return "fix";
        if (message.startsWith("perf")) return "perf";
        if (message.startsWith("chore")) return "chore";
        return "other";
    };

    const cleanMessage = (message: string) => {
        // Remove conventional commit prefix (feat: , fix: ) and keep the rest
        return message.replace(/^(feat|fix|perf|chore|docs|style|refactor|test)(\(.*\))?:/, "").trim();
    };

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const response = await fetch("https://api.github.com/repos/dhidroid/dhidroid-portfolio/commits?per_page=30");
                if (!response.ok) {
                    throw new Error("Repository access restricted or rate limited");
                }
                
                const data: GitHubCommit[] = await response.json();
                
                // Group by Date
                const grouped: { [key: string]: ChangelogGroup } = {};

                data.forEach(commit => {
                    const dateObj = new Date(commit.commit.author.date);
                    const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    
                    if (!grouped[dateStr]) {
                        grouped[dateStr] = {
                            version: dateStr,
                            date: dateObj.toLocaleDateString('en-US', { weekday: 'long' }), // Subtitle
                            label: "Update",
                            type: "minor",
                            items: []
                        };
                    }

                    const type = getTypeFromMessage(commit.commit.message);
                    const text = cleanMessage(commit.commit.message).split('\n')[0]; // Take first line only

                    grouped[dateStr].items.push({
                        type,
                        text,
                        hash: commit.sha.substring(0, 7),
                        url: commit.html_url
                    });
                });

                setChanges(Object.values(grouped));
                setIsLive(true);
            } catch (err) {
                console.warn("GitHub fetch failed, using fallback:", err);
                setChanges(fallbackChanges);
                setIsLive(false);
            } finally {
                setLoading(false);
            }
        };

        fetchCommits();
    }, []);

    return (
        <React.Fragment>
            <SEO title="Changelog | Dhidroid" description="Version history and updates." url="/changelog" />
            
            {/* Header */}
            <section className="pt-32 pb-24 bg-background border-b border-border/40">
                <Container className="text-center">
                    <Badge className="mb-6 rounded-none">{isLive ? "Live History" : "Version History"}</Badge>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                        Changelog & <span className="text-primary">Updates</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-sans">
                        {isLive 
                            ? "A realtime timeline of code commits, features, and fixes directly from my GitHub repository."
                            : "A curated timeline of improvements, features, and fixes for the platform."}
                    </p>
                </Container>
            </section>

            {/* Content */}
            <section className="py-24 bg-background">
                <Container className="max-w-4xl">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                            <p className="text-muted-foreground">Checking for updates...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-12">
                            {changes.map((change) => (
                                 <div 
                                    key={change.version} 
                                    className="bg-card border border-border/60 p-8 md:p-12 relative overflow-hidden group hover:shadow-lg transition-shadow duration-500"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border/30 pb-8">
                                        <div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className="text-2xl font-display font-bold text-foreground">{change.version}</span>
                                                <Badge variant="outline" className="bg-transparent rounded-full">{change.label}</Badge>
                                            </div>
                                            <span className="text-muted-foreground font-mono text-sm flex items-center gap-2">
                                                <Calendar size={12} />
                                                {change.date}
                                            </span>
                                        </div>
                                        <div className="text-xl md:text-2xl font-display font-bold text-muted/20 group-hover:text-primary/20 transition-colors">
                                            Commit Log
                                        </div>
                                    </div>
                                    
                                    <ul className="space-y-4">
                                        {change.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 group/item">
                                                <div className="mt-1 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                                                    {getIcon(item.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-foreground/80 font-sans leading-relaxed hover:text-primary transition-colors block truncate">
                                                        {item.text}
                                                    </a>
                                                </div>
                                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                                    {item.hash}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                 </div>
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </React.Fragment>
    );
};

export default Changelog;
