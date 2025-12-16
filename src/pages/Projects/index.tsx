import React, { useEffect, useState } from "react";
import { client } from "../../senity/senity";
import SEO from '../../components/SEO';
import Loader from "../../components/loader/Loader";
import { AiOutlineArrowRight } from 'react-icons/ai';

const Projects = () => {
  const [ProjectData, setProjectData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [expandedProject, setExpandedProject] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    client
      .fetch(`*[_type == "project"] | order(_createdAt desc) {
        title,
        slug {
          current
        },
        description,
        image { 
          asset -> {
            _id,
            url
          },
          alt
        },
        categories[] -> { title },
        link,
        _createdAt,
        _updatedAt
      }`)
      .then((data) => {
        setProjectData(data);

        // Extract unique categories
        const allCategories = data.flatMap((project: any) =>
          project.categories?.map((cat: any) => cat.title) || []
        );
        const uniqueCategories = ["All", ...Array.from(new Set(allCategories))];
        setCategories(uniqueCategories as string[]);
      })
      .catch(console.error)
      .finally(() => { 
        setLoading(false); 
      });
  }, []);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "All"
    ? ProjectData
    : ProjectData.filter((project: any) =>
      project.categories?.some((cat: any) => cat.title === selectedCategory)
    );

  // SEO Configuration
  const pageTitle = "Projects | dhidroid - Portfolio of Web & Mobile App Development";
  const baseUrl = "https://dhidroid.vercel.app";
  const canonicalUrl = `${baseUrl}/projects`;
  
  const metaDescription = ProjectData.length > 0
    ? `Explore ${ProjectData.length} innovative projects by dhidroid including ${ProjectData.slice(0, 3).map((p: any) => p.title).join(", ")}. Showcasing expertise in React, React Native, Firebase, and modern web development.`
    : "Discover innovative web and mobile app development projects by dhidroid. Expertise in React, React Native, Firebase, Node.js, and cutting-edge technologies.";

  const dynamicKeywords = ProjectData.length > 0
    ? [
      ...new Set(ProjectData.flatMap((data: any) =>
        data.categories?.map(({ title }: any) => title) || []
        )),
        "portfolio projects",
        "web development",
        "mobile app development",
        "dhidroid",
        "dhineshkumar thirupathi"
      ].join(", ")
    : "Projects, Portfolio, App Development, React, React Native, Firebase, Web Development, Mobile Apps, Full Stack Development, dhidroid, dhineshkumar thirupathi";

  // OG image is resolved by the `SEO` component using route mapping or page-provided images.

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {/* Use centralized SEO component that resolves the OG image using route mapping */}
      <SEO
        title={pageTitle}
        description={metaDescription}
        keywords={dynamicKeywords.split(',').map(s => s.trim())}
        route="/project"
        url={canonicalUrl}
      />

      <div className="min-h-screen w-full bg-gradient-to-b from-[#050505] via-[#0a0a0f] to-[#050505] pt-32 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <header className="mb-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-secondary text-white mb-4">
              Discover My <span className="text-[#5315FC]">Digital Solutions</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#5315FC] to-[#7B47FF] mb-6"></div>
            {ProjectData.length > 0 && (
              <p className="text-gray-400 text-lg md:text-xl">
                Showcasing {filteredProjects.length} innovative {filteredProjects.length === 1 ? 'project' : 'projects'} in web and mobile development
              </p>
            )}
          </div>
        </header>

        {/* Filter Pills */}
        {categories.length > 1 && (
          <div className="max-w-7xl mx-auto mb-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === category
                    ? 'bg-gradient-to-r from-[#5315FC] to-[#7B47FF] text-white shadow-[0_10px_30px_rgba(83,21,252,0.4)] scale-105'
                    : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 hover:border-[#5315FC]/50 hover:text-white backdrop-blur-sm'
                    }`}
                >
                  {category}
                  {category === "All" && ` (${ProjectData.length})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Projects List */}
        <main className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="space-y-6">
              {filteredProjects.map((data: any, index: number) => (
                <article
                  key={data?.slug?.current || index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 hover:border-[#5315FC]/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(83,21,252,0.2)]"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#5315FC] to-[#7B47FF] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Content */}
                    <div className="flex-1 pt-4">
                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-secondary group-hover:text-[#A99DFF] transition-colors duration-300">
                        {data.title}
                      </h2>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {data.categories?.map((cat: any, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/20 hover:bg-[#5315FC]/30 hover:border-[#5315FC]/50 transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedCategory(cat.title)}
                          >
                            {cat.title}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 line-clamp-3">
                        {data.description}
                      </p>

                      {/* Read More / CTA Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {data.description && data.description.length > 150 && (
                          <button
                            onClick={() => setExpandedProject(data)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 text-white font-semibold text-sm transition-all duration-300 hover:bg-white/10 hover:border-[#5315FC]/50"
                          >
                            <span>Read More</span>
                          </button>
                        )}
                        <button
                          onClick={() => window.open(data.link)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5315FC] hover:bg-[#7B47FF] text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(83,21,252,0.4)] hover:scale-105 group/btn"
                        >
                          <span>View Project</span>
                          <AiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="lg:w-[400px] flex-shrink-0">
                      <div className="relative rounded-2xl overflow-hidden aspect-video">
                        <img
                          src={data.image?.asset?.url}
                          alt={data.image?.alt || data.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-gray-400 text-xl mb-4">No projects found in this category</p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="px-6 py-3 rounded-full bg-[#5315FC] hover:bg-[#7B47FF] text-white font-semibold transition-all duration-300"
                  >
                    Show All Projects
                  </button>
                </div>
              </div>
          )}
        </main>

        {/* Expand Modal */}
        {expandedProject && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedProject(null)}
          >
            <div
              className="bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#5315FC]/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
              >
                <span className="text-white text-2xl">×</span>
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white font-secondary">
                  {expandedProject.title}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {expandedProject.categories?.map((cat: any, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 rounded-full bg-[#5315FC]/30 backdrop-blur-md text-white text-xs font-medium border border-[#5315FC]/50"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>

                {/* Image */}
                {expandedProject.image?.asset?.url && (
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={expandedProject.image.asset.url}
                      alt={expandedProject.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Full Description */}
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {expandedProject.description}
                </p>

                {/* View Project Button */}
                <button
                  onClick={() => window.open(expandedProject.link)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#5315FC] hover:bg-[#7B47FF] text-white font-semibold transition-all duration-300 hover:shadow-[0_10px_30px_rgba(83,21,252,0.4)] hover:scale-105 group/btn"
                >
                  <span>View Project</span>
                  <AiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Projects;
