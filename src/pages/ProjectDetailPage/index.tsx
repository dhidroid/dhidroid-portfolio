import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { client } from "../../senity/senity";
import imageUrlBuilder from '@sanity/image-url';
import SEO from "../../components/SEO";
import ProjectHero from "../../components/project/ProjectHero";
import ProjectTabs from "../../components/project/ProjectTabs";
import ProjectGallery from "../../components/project/ProjectGallery";
import { AISummary } from "../../components/ui/AISummary";
import { DynamicIcon } from "../../components/ui/DynamicIcon";
import { generateMetaForRoute } from "../../utils/seo";

interface ProjectDetail {
  title: string;
  tagline?: string;
  year?: string;
  role?: string;
  description?: string; // Overview
  image: { asset: { url: string; _id: string } };
  challenge?: string;
  results?: string;
  link?: string;
  gallery?: { asset: { url: string } }[];
  categories?: { title: string }[];
  solution?: any[]; // Block content
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
     return <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
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
      <main className="bg-white min-h-screen">
         <ProjectHero 
           title={project.title}
           client={project.tagline} 
           year={project.year}
           role={project.role}
           image={project.image?.asset?.url}
         />
         
         <div className="max-w-[1800px] mx-auto px-6 mb-24">
            <div className="md:grid md:grid-cols-2 lg:gap-32 gap-12 items-start">
                <div className="mb-12 md:mb-0">
                   <AISummary summary={project.description} type="project" />
                </div>
                <div>
                   <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-100 pb-2">Tech Stack</h3>
                   <div className="flex flex-wrap gap-4">
                      {project.categories?.map((cat: any) => (
                         <div key={cat.title} className="flex items-center gap-2 text-base font-medium text-slate-900 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                             <DynamicIcon name={cat.title} className="w-5 h-5 text-gray-400" />
                             {cat.title}
                         </div>
                      ))}
                   </div>
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
