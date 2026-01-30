import React, { useEffect, useState } from "react";
import { client } from "../../senity/senity";
import ProjectCard from "./ProjectCard";
import { Container } from "../ui/Container";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  image?: { asset: { url: string } };
  year?: string;
  categories?: { title: string }[];
}

const ProjectGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `
          *[_type == "project"] | order(_createdAt desc) {
            _id,
            title,
            slug,
            year,
            image {
              asset->{ url }
            },
            categories[] -> { title }
          }
        `;
        const data = await client.fetch(query);
        setProjects(data);
        setFilteredProjects(data);

        // Extract categories
        const allCats = data.flatMap((p: any) => p.categories?.map((c: any) => c.title) || []);
        setCategories(["All", ...Array.from(new Set(allCats)) as string[]]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => 
        p.categories?.some(c => c.title === selectedCategory)
      ));
    }
  }, [selectedCategory, projects]);

  return (
    <section className="bg-white min-h-screen pb-32">
      <Container className="max-w-[1800px] px-6">
        {/* Category Filter - Minimalist Text */}
        <div className="flex gap-6 mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm font-medium uppercase tracking-widest transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedCategory === cat ? 'text-black border-b border-black' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {filteredProjects.map((project, index) => {
             // Logic: Every 3rd item spans full width in the filtered view
             const isFullWidth = index % 3 === 0;

             return (
               <ProjectCard
                 key={project._id}
                 id={project._id}
                 title={project.title}
                 slug={project.slug.current}
                 image={(project as any).image?.asset?.url}
                 year={project.year || "2024"}
                 category={project.categories?.[0]?.title}
                 className={isFullWidth ? "md:col-span-2" : ""}
               />
             );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ProjectGrid;
