import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import SEO from "../../components/SEO";
import { client } from "../../senity/senity";
import { generateMetaForRoute } from '../../utils/seo';
import Hero from "../../components/home/Hero";
import SelectedWork from "../../components/home/SelectedWork";
import ExperienceStats from "../../components/about/ExperienceStats";
import CTA from "../../components/home/CTA";
import HomeBlogCard from "../../components/Cards/HomeBlogCards";
import { Container } from "../../components/ui/Container";
import WorkExperience from "../../components/home/WorkExperience";
import ServiceList from "../../components/services/ServiceList";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<any[]>([]);
  const [workExpData, setWorkExpData] = React.useState<any[]>([]);

  // Fetch Blog Data
  const fetchBlogData = async () => {
    try {
      const query = `
              *[_type == "post"] {
                  title,
                  slug { current },
                  mainImage { asset->{_id, url}, alt },
                  author -> { name, image { asset->{_id, url} } },
                  categories[] -> { title },
                  publishedAt,
                  "excerpt": pt::text(body)[0...200],
                  "bodyText": pt::text(body)
              } | order(publishedAt desc)[0...3]`;

      const fetchData = await client.fetch(query);

      const enriched = fetchData.map((post: any) => {
        const text = (post.bodyText || post.excerpt || '').trim();
        const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
        return {
          ...post,
          readingTime: Math.max(1, Math.ceil(words / 200)),
          excerpt: post.excerpt || (text.length ? `${text.slice(0, 200)}...` : ''),
        };
      });

      setBlogData(enriched);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchWorkExperience = async () => {
    try {
      const query = `
            *[_type == "workExperience"]{
                company,
                title,
                location,
                tags,
                description,
                duration[]{ from, toDate }
            }`;
      const result = await client.fetch(query);

      let mappedData: any[] = [];

      if (result && result.length > 0) {
        const sortedData = result.sort((a: any, b: any) => {
          const dateA = new Date(a.duration?.[0]?.from || 0).getTime();
          const dateB = new Date(b.duration?.[0]?.from || 0).getTime();
          return dateB - dateA;
        });

        mappedData = sortedData.map((item: any) => {
          const startYear = item.duration?.[0]?.from ? new Date(item.duration[0].from).getFullYear() : '';
          const endYear = item.duration?.[0]?.toDate ? new Date(item.duration[0].toDate).getFullYear() : 'Present';
          const period = startYear ? `${startYear} - ${endYear}` : '';

          return {
            id: item._id || item.company,
            company: item.company,
            role: item.title,
            period: period,
            location: item.location,
            tags: item.tags,
            achievements: item.description ? [item.description] : []
          };
        });
      } else {
        // Fallback Data from User Request if CMS is empty
        mappedData = [
          {
            id: "natobotics",
            company: "Natobotics Technology Pvt. Ltd.",
            role: "React Native Developer",
            period: "2024 - Present",
            location: "Chennai, India",
            tags: ["React Native", "Android", "iOS", "Typescript", "App Development", "Full Stack"],
            achievements: ["Building scalable digital products.", "Cross-platform mobile application development."]
          },
          {
            id: "freelance",
            company: "Fiverr & Upwork",
            role: "Full Stack Development",
            period: "2024",
            location: "Remote",
            tags: ["Full Stack", "Mobile App Development", "Web Development", "UI/UX"],
            achievements: ["Delivering high-quality web and mobile solutions for global clients."]
          },
          {
            id: "algojaxon",
            company: "Algojaxon Global Soft",
            role: "Full Stack & Mobile App Dev",
            period: "2023",
            location: "Salem, TamilNadu",
            tags: ["MERN Stack", "React Native", "Android", "iOS"],
            achievements: ["Developed full stack web and mobile applications."]
          }
        ];
      }

      setWorkExpData(mappedData);
    } catch (error) {
      console.error(error);
      // On Error, also use fallback to ensure UI shows
      setWorkExpData([
        {
          id: "natobotics",
          company: "Natobotics Technology Pvt. Ltd.",
          role: "React Native Developer",
          period: "2024 - Present",
          location: "Chennai, India",
          tags: ["React Native", "Android", "iOS", "Typescript"],
          achievements: []
        },
        {
          id: "freelance",
          company: "Fiverr & Upwork",
          role: "Full Stack Development",
          period: "2024",
          location: "Remote",
          tags: ["Full Stack", "React", "Node"],
          achievements: []
        },
        {
          id: "algojaxon",
          company: "Algojaxon Global Soft",
          role: "Full Stack & Mobile App Dev",
          period: "2023",
          location: "Salem, TamilNadu",
          tags: ["MERN", "Mobile"],
          achievements: []
        }
      ]);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchWorkExperience();
  }, []);


  return (
    <React.Fragment>
      <SEO
        {...generateMetaForRoute('/')}
      />

      <Hero />

      <ExperienceStats />

      {/* <Capabilities /> */}
      <ServiceList />
      <SelectedWork />

      {/* <Testimonials /> */}
      {workExpData.length > 0 && (
        <div className="pt-24 bg-background border-t border-slate-200 dark:border-zinc-800">
          <WorkExperience experiences={workExpData} />
        </div>
      )}

      {/* Blog Section */}
      <section className="py-24 bg-background border-t border-slate-200 dark:border-zinc-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="select-none">
              <div className="mb-4">
                <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-zinc-700/50">
                  06 // ARTICLES & ESSAYS
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tighter mb-4 text-slate-900 dark:text-white">
                Latest Insights
              </h2>
              <p className="text-lg text-slate-500 dark:text-zinc-400 font-body">
                Thoughts on development, design, and technology.
              </p>
            </div>
            <Link to="/bloglist" className="font-mono text-xs uppercase tracking-wider text-primary">
              [ View all posts ]
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogData.map((post) => (
              <HomeBlogCard
                key={post.slug.current}
                BlogTitle={post.title}
                BlogImage={post.mainImage?.asset?.url}
                categories={post.categories?.map((c: any) => c.title) || []}
                excerpt={post.excerpt}
                readingTime={post.readingTime}
                author={post.author?.name}
                date={post.publishedAt}
                onPress={() => navigate(`/blog/${post.slug.current}`)}
              />
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </React.Fragment>
  );
};

export default HomePage;