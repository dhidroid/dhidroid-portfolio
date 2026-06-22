import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { client } from "../../senity/senity";
import imageUrlBuilder from '@sanity/image-url';
import SEO from "../../components/SEO";
import ProjectHero from "../../components/project/ProjectHero";
import ProjectTabs from "../../components/project/ProjectTabs";
import ProjectGallery from "../../components/project/ProjectGallery";
import { AISummary } from "../../components/ui/AISummary";
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
          // navigate('/404'); // Temporarily disable redirect to see if it's a fetch issue
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
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-border border-t-[#5235F6] rounded-full animate-spin" />
    </div>;
  }

  if (!project) return null;

  const builder = imageUrlBuilder(client);
  const ogImage = project.image ? builder.image(project.image).width(1200).height(630).fit('crop').url() : undefined;

  const meta = generateMetaForRoute(`/works/${slug}`, {
    title: project.title,
    description: project.tagline || project.description?.slice(0, 160),
    image: ogImage,
    keywords: ["case study", project.title, ...(project.role ? [project.role] : [])],
    type: 'article', // Treat case studies as articles for better rich snippets
  });

  return (
    <React.Fragment>
      <SEO
        {...meta}
      />
      <main className="bg-background min-h-screen">
        <ProjectHero
          title={project.title}
          client={project.tagline}
          year={project.year}
          role={project.role}
          image={project.image?.asset?.url}
        />
        {(project.link || project.github) && (
          <section className="py-24 md:py-32 border-t border-border">
            <div className="max-w-[1800px] mx-auto px-6">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-row items-start justify-between gap-12"
              >
                <div className="overflow-hidden mb-2">
                  <div className="overflow-hidden mb-4">
                    <motion.span
                      variants={fadeInUp}
                      className="text-sm font-mono uppercase tracking-widest text-gray-400"
                    >
                      Live Links
                    </motion.span>
                  </div>
                  <div className="overflow-hidden mb-16">
                    <motion.h2
                      variants={fadeInUp}
                      className="text-[12vw] md:text-[8rem] font-bold font-display uppercase leading-[0.85] tracking-tighter text-foreground"
                    >
                      VIEW
                      <span className="block italic font-serif opacity-50 ml-[5vw]">PROJECT.</span>
                    </motion.h2>
                  </div>
                </div>
                <div className="flex flex-col gap-12">
                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-col items-start gap-4"
                  >
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium text-lg hover:bg-[#5235F6] hover:text-white transition-all duration-300"
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
                        className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-foreground text-foreground rounded-full font-medium text-lg hover:bg-foreground hover:text-background transition-all duration-300"
                      >
                        <Github className="w-5 h-5" />
                        View Code
                      </a>
                    )}
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-6 border-b border-border pb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-4">
                      {project.categories?.map((cat: any) => (
                        <div key={cat.title} className="flex items-center gap-2 text-base font-medium text-foreground bg-slate-50/50 dark:bg-zinc-900/50 px-4 py-2 rounded-lg border border-border">
                          <DynamicIcon name={cat.title} className="w-5 h-5 text-gray-400" />
                          {cat.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </section>
        )}

        <div className="max-w-[1800px] mx-auto px-6 mb-24">
          <div className="md:grid md:grid-cols-2 lg:gap-32 gap-12 items-start">
            <div className="mb-12 md:mb-0">
              {/* <AISummary summary={project.description} type="project" /> */}
            </div>
          </div>
        </div>

        <ProjectTabs
          overview={project.description}
          challenge={project.challenge}
          results={project.results}
          solution={project.solution}
        />

        <ProjectGallery images={project.gallery} />
      </main>
    </React.Fragment>
  );
};

export default ProjectDetailPage;
