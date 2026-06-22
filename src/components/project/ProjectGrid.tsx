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
    <section className="bg-background min-h-screen pb-32 border-t border-slate-200 dark:border-zinc-800">
      <Container className="max-w-[1800px] px-6">
        {/* Category Filter - Swiss Monospace Buttons */}
        <div className="flex gap-4 mb-16 overflow-x-auto pb-4 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 border rounded-sm transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                selectedCategory === cat 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white' 
                : 'text-slate-500 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:text-slate-900 dark:hover:text-white'
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
