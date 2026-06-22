import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { client } from "../../senity/senity";
import imageUrlBuilder from '@sanity/image-url';
import SEO from "../../components/SEO";
import ProjectHero from "../../components/project/ProjectHero";
import ProjectGallery from "../../components/project/ProjectGallery";
import { D3ProjectNetwork } from "../../components/project/D3ProjectNetwork";
import { PortableText } from "@portabletext/react";
import { DynamicIcon } from "../../components/ui/DynamicIcon";
import { generateMetaForRoute } from "../../utils/seo";
import { fadeInUp, staggerContainer } from "../../utils/motion";

interface ProjectDetail {
  title: string;
  tagline?: string;
  year?: string;
  role?: string;
  description?: string;
  image: { asset: { url: string; _id: string } };
  challenge?: string;
  results?: string;
  link?: string;
  github?: string;
  gallery?: { asset: { url: string } }[];
  categories?: { title: string }[];
  solution?: any[];
}

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const query = `
          *[_type == "project" && slug.current == $slug][0] {
            title,
            tagline,
            year,
            role,
            description,
            challenge,
            results,
            link,
            github,
            solution,
            image {
              asset->{ _id, url }
            },
            gallery[] {
              asset->{ _id, url }
            },
            categories[] -> { title }
          }
        `;
        const data = await client.fetch(query, { slug });
        if (!data) {
          console.error("Project not found query returned null for slug:", slug);
        }
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-border border-t-[#5235F6] rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  const builder = imageUrlBuilder(client);
  const ogImage = project.image ? builder.image(project.image).width(1200).height(630).fit('crop').url() : undefined;

  const meta = generateMetaForRoute(`/works/${slug}`, {
    title: project.title,
    description: project.tagline || project.description?.slice(0, 160),
    image: ogImage,
    keywords: ["case study", project.title, ...(project.role ? [project.role] : [])],
    type: 'article',
  });

  return (
    <React.Fragment>
      <SEO {...meta} />
      <main className="bg-background min-h-screen">
        <ProjectHero
          title={project.title}
          client={project.tagline}
          year={project.year}
          role={project.role}
          image={project.image?.asset?.url}
        />

        {/* Asymmetric Swiss-Grid Project URLS & Tech Stack */}
        {(project.link || project.github) && (
          <section className="border-b border-border bg-white/50 dark:bg-zinc-950/20">
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-16">
              <div className="lg:col-span-4 flex flex-col justify-between">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-4">
                    [ ACCESS // LINKS ]
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-foreground leading-[0.9]">
                    Project URLs
                  </h2>
                </motion.div>
              </div>
              <div className="lg:col-span-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-sm font-medium text-lg hover:bg-[#5235F6] hover:text-white transition-all duration-300"
                    >
                      Visit Live Site
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-foreground text-foreground rounded-sm font-medium text-lg hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                </div>

                <div className="w-full md:w-auto max-w-sm">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-3 border-b border-border pb-2">
                    [ STACK INDEX ]
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.categories?.map((cat: any) => (
                      <div
                        key={cat.title}
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-foreground bg-slate-100/50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-sm border border-border"
                      >
                        <DynamicIcon name={cat.title} className="w-3.5 h-3.5 text-gray-400" />
                        {cat.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sequential Editorial Grid Block Sections */}
        <section className="border-b border-border">
          <div className="max-w-[1800px] mx-auto divide-y divide-border">
            
            {/* 01 // OVERVIEW */}
            {project.description && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-16">
                <div className="lg:col-span-4">
                  <div className="sticky top-24">
                    <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 block mb-4">
                      [ 01 // OVERVIEW ]
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-foreground leading-[0.9]">
                      Project Summary
                    </h2>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="prose prose-lg md:prose-xl dark:prose-invert text-foreground leading-relaxed font-sans max-w-none whitespace-pre-wrap">
                    {project.description}
                  </div>
                </div>
              </div>
            )}

            {/* 02 // TECHNICAL DEPS (D3 Network Graph) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-16">
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 block mb-4">
                    [ 02 // TECHNICAL DEPS ]
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-foreground leading-[0.9]">
                    Blueprint Topology
                  </h2>
                  <p className="text-sm font-mono text-slate-500 dark:text-zinc-400 mt-4 leading-relaxed max-w-xs">
                    An interactive visualization of structural modules, layers, and packages powering this system.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-8">
                <D3ProjectNetwork
                  projectTitle={project.title}
                  tags={project.categories?.map((cat: any) => cat.title) || []}
                />
              </div>
            </div>

            {/* 03 // THE CHALLENGE */}
            {project.challenge && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-16">
                <div className="lg:col-span-4">
                  <div className="sticky top-24">
                    <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 block mb-4">
                      [ 03 // THE CHALLENGE ]
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-foreground leading-[0.9]">
                      The Problem
                    </h2>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="prose prose-lg md:prose-xl dark:prose-invert text-foreground leading-relaxed font-sans max-w-none whitespace-pre-wrap">
                    {project.challenge}
                  </div>
                </div>
              </div>
            )}

            {/* 04 // THE RESOLUTION */}
            {project.solution && project.solution.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-16">
                <div className="lg:col-span-4">
                  <div className="sticky top-24">
                    <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 block mb-4">
                      [ 04 // THE RESOLUTION ]
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-foreground leading-[0.9]">
                      Our Solution
                    </h2>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="prose prose-lg md:prose-xl dark:prose-invert text-foreground leading-relaxed font-sans max-w-none">
                    <PortableText value={project.solution} />
                  </div>
                </div>
              </div>
            )}

            {/* 05 // OUTCOMES */}
            {project.results && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-16">
                <div className="lg:col-span-4">
                  <div className="sticky top-24">
                    <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 block mb-4">
                      [ 05 // OUTCOMES ]
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-foreground leading-[0.9]">
                      The Results
                    </h2>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="prose prose-lg md:prose-xl dark:prose-invert text-foreground leading-relaxed font-sans max-w-none whitespace-pre-wrap">
                    {project.results}
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="p-8 md:p-16">
            <div className="max-w-[1800px] mx-auto mb-8">
              <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 block mb-4">
                [ VISUAL INDEX // GALLERY ]
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight text-foreground leading-[0.9] mb-12">
                Project Gallery
              </h2>
            </div>
            <ProjectGallery images={project.gallery} />
          </section>
        )}
      </main>
    </React.Fragment>
  );
};

export default ProjectDetailPage;
