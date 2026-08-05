import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { User, BookOpen, ArrowUpRight, Github, Linkedin, Mail, Search, CheckCircle2 } from "lucide-react";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { client } from "../../senity/senity";
import CTA from "../../components/home/CTA";
import { generateMetaForRoute } from "../../utils/seo";
import { fadeInUp, staggerContainer } from "../../utils/motion";
import { PortableText } from "@portabletext/react";

interface AuthorItem {
  _id: string;
  name: string;
  slug?: { current: string };
  image?: { asset?: { url: string } };
  bio?: any;
  role?: string;
  specialty?: string[];
  postCount?: number;
  latestPosts?: Array<{ title: string; slug: { current: string }; publishedAt: string }>;
  github?: string;
  linkedin?: string;
  email?: string;
}

const BlogAuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<AuthorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const query = `
          *[_type == "author"] {
            _id,
            name,
            slug,
            image { asset->{_id, url} },
            bio,
            "postCount": count(*[_type == "post" && references(^._id)]),
            "latestPosts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3] {
              title,
              slug,
              publishedAt
            }
          } | order(postCount desc)
        `;
        const data = await client.fetch(query);

        if (data && data.length > 0) {
          const enriched = data.map((item: any) => ({
            ...item,
            role: item.name.includes("Dhinesh")
              ? "Founder & Lead Mobile Engineer"
              : item.name.includes("Kishore")
              ? "Full-Stack Web Developer"
              : "Technical Author",
            specialty: item.name.includes("Dhinesh")
              ? ["React Native", "Go", "Cloud", "TypeScript"]
              : item.name.includes("Kishore")
              ? ["MERN Stack", "React", "Node.js", "MongoDB"]
              : ["Full Stack", "Web Dev"],
            github: item.github || "https://github.com/dhidroid",
            linkedin: item.linkedin || "https://www.linkedin.com/in/dhidroid-rndev",
            email: item.email || "contact@dhidroid.dev"
          }));

          setAuthors(enriched);
        } else {
          setAuthors([]);
        }
      } catch (error) {
        console.error("Error fetching authors from Sanity server:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const filteredAuthors = authors.filter((author) => {
    const matchName = author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = (author.role || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpecialty = author.specialty?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchName || matchRole || matchSpecialty;
  });

  return (
    <React.Fragment>
      <SEO
        {...generateMetaForRoute('/blog/authors')}
        title="Blog Authors & Editorial Team | Dhidroid"
        description="Meet the authors and contributors publishing technical articles on the Dhidroid blog."
      />

      <main className="bg-background min-h-screen">
        {/* Header Hero Section */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border bg-background">
          <Container className="max-w-[1800px] px-6">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-border bg-slate-100 dark:bg-zinc-900 font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-widest"
              >
                <span className="w-2 h-2 rounded-full bg-[#5235F6]" />
                <span>EDITORIAL BOARD // SANITY SERVER AUTHORS</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeInUp}
                className="text-[10vw] md:text-[6rem] leading-[0.88] font-extrabold font-display tracking-tighter text-foreground uppercase"
              >
                EDITORIAL <span className="text-slate-400 dark:text-zinc-600 italic font-serif font-normal lowercase">board &</span> AUTHORS.
              </motion.h1>

              {/* Subtitle & Monospace Stats */}
              <div className="grid md:grid-cols-12 gap-6 items-end pt-4">
                <motion.p
                  variants={fadeInUp}
                  className="md:col-span-8 text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-3xl font-body leading-relaxed"
                >
                  Discover technical writers, full-stack engineers, and mobile specialists contributing to the Dhidroid technical blog directly from our Sanity Studio CMS.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="md:col-span-4 flex justify-start md:justify-end gap-6 font-mono text-xs text-slate-500 dark:text-zinc-400 border-t md:border-t-0 border-border pt-4 md:pt-0"
                >
                  <div>
                    <span className="block text-slate-400">SANITY AUTHORS</span>
                    <span className="text-lg font-bold text-foreground">{authors.length}</span>
                  </div>
                  <div className="border-l border-border pl-6">
                    <span className="block text-slate-400">CMS SYNC</span>
                    <span className="text-lg font-bold text-[#5235F6]">LIVE DATA</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Content Section */}
        <Container className="max-w-[1800px] px-6 py-16">
          {/* Search Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 border-b border-border pb-8">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search author name or stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-zinc-900 border border-border rounded-sm text-sm focus:outline-none focus:border-[#5235F6] font-body"
              />
            </div>
            <div className="font-mono text-xs text-slate-500 uppercase tracking-widest">
              SHOWING {filteredAuthors.length} OF {authors.length} SANITY AUTHORS
            </div>
          </div>

          {/* Authors Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="h-80 bg-slate-100 dark:bg-zinc-900 rounded-sm animate-pulse" />
              ))}
            </div>
          ) : filteredAuthors.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-sm">
              <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold font-display text-foreground">No authors found</h3>
              <p className="text-sm text-slate-500 mt-1">Try resetting your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {filteredAuthors.map((author) => {
                const imageUrl = author.image?.asset?.url;
                return (
                  <div
                    key={author._id}
                    className="border border-border bg-slate-50/50 dark:bg-zinc-900/30 p-8 md:p-10 rounded-sm space-y-8 relative overflow-hidden group hover:border-[#5235F6]/50 transition-colors duration-300"
                  >
                    {/* Top Monospace Tag */}
                    <div className="flex justify-between items-center border-b border-border pb-4 font-mono text-xs">
                      <div className="flex items-center gap-2 text-[#5235F6] font-bold uppercase tracking-wider">
                        <CheckCircle2 size={14} />
                        <span>{author.role || "TECHNICAL AUTHOR"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 font-bold">
                        <BookOpen size={13} />
                        <span>{author.postCount ?? 0} ARTICLES PUBLISHED</span>
                      </div>
                    </div>

                    {/* Main Bio Area */}
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      {/* Avatar */}
                      <div className="shrink-0">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={author.name}
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-border shadow-md grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#5235F6]/10 border-2 border-border flex items-center justify-center text-[#5235F6]">
                            <User className="w-12 h-12 opacity-80" />
                          </div>
                        )}
                      </div>

                      {/* Bio Content */}
                      <div className="space-y-3 flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground group-hover:text-[#5235F6] transition-colors">
                          {author.name}
                        </h2>

                        <div className="text-sm md:text-base text-slate-600 dark:text-zinc-400 font-body leading-relaxed">
                          {author.bio ? (
                            Array.isArray(author.bio) ? (
                              <PortableText value={author.bio} />
                            ) : (
                              <p>{String(author.bio)}</p>
                            )
                          ) : (
                            <p>
                              Senior Software Engineer & Mobile Specialist based in Chennai, crafting high-performance cross-platform apps, distributed backend systems, and open source tooling.
                            </p>
                          )}
                        </div>

                        {/* Specialties Tags */}
                        {author.specialty && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {author.specialty.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 bg-white dark:bg-zinc-800 border border-border rounded-sm font-mono text-[10px] text-slate-600 dark:text-zinc-400 uppercase tracking-wider"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recent Articles list if available */}
                    {author.latestPosts && author.latestPosts.length > 0 && (
                      <div className="border-t border-border pt-6 space-y-3">
                        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block">
                          RECENT ARTICLES BY {author.name.toUpperCase()}
                        </span>
                        <div className="space-y-2">
                          {author.latestPosts.map((post) => (
                            <Link
                              key={post.slug?.current || post.title}
                              to={`/blog/${post.slug?.current}`}
                              className="flex items-center justify-between p-2.5 bg-white dark:bg-zinc-950/40 border border-border hover:border-[#5235F6] text-sm text-foreground hover:text-[#5235F6] transition-colors rounded-sm group/link"
                            >
                              <span className="font-medium truncate pr-4">{post.title}</span>
                              <ArrowUpRight className="w-4 h-4 shrink-0 text-slate-400 group-hover/link:text-[#5235F6] transition-colors" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom Links */}
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <Link
                        to="/bloglist"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#5235F6] hover:underline"
                      >
                        <span>View Articles</span>
                        <ArrowUpRight size={14} />
                      </Link>

                      <div className="flex gap-3 text-slate-400">
                        {author.github && (
                          <a href={author.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                            <Github size={16} />
                          </a>
                        )}
                        {author.linkedin && (
                          <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                            <Linkedin size={16} />
                          </a>
                        )}
                        {author.email && (
                          <a href={`mailto:${author.email}`} className="hover:text-foreground transition-colors">
                            <Mail size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </main>

      <CTA />
    </React.Fragment>
  );
};

export default BlogAuthorsPage;
