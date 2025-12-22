import React, { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import { Link, useNavigate } from "react-router";
import { client } from "../../senity/senity";
import { generateMetaForRoute } from '../../utils/seo';
import Hero from "../../components/home/Hero";
import Clients from "../../components/home/Clients";
import Features from "../../components/home/Features";
import Skills from "../../components/home/Skills";
import WorkExperience from "../../components/home/WorkExperience";
import CTA from "../../components/home/CTA";
import HomeBlogCard from "../../components/Cards/HomeBlogCards";
import { Container } from "../../components/ui/Container";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<any[]>([]);
  const [workExpData, setWorkExpData] = useState<any[]>([]);

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

  // Fetch Work Experience
  const fetchWorkExperience = async () => {
    try {
      const query = `
        *[_type == "workExperience"]{
            company,
            title,
            location,
            tags,
            duration[]{ from, toDate }
        }`;

      const result = await client.fetch(query);

      const sortedData = result.sort((a: any, b: any) => {
        const dateA = new Date(a.duration?.[0]?.from || 0).getTime();
        const dateB = new Date(b.duration?.[0]?.from || 0).getTime();
        return dateB - dateA;
      });

      // Map to ExperienceItem interface
      const mappedData = sortedData.map((item: any) => {
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
          achievements: [] // Sanity query doesn't (yet) return description/achievements here
        };
      });

      setWorkExpData(mappedData);
    } catch (error) {
      console.error("Error fetching work experience:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchWorkExperience();
  }, []);

  return (
    <React.Fragment>
      <SEO
        title={generateMetaForRoute('/').title}
        description={generateMetaForRoute('/').description}
        keywords={generateMetaForRoute('/').keywords}
        route='/'
        url='/'
        structuredData={generateMetaForRoute('/').structuredData}
      />

      <Hero />
      <Clients />
      <Features />
      <Skills />

      {/* Work Experience / Stats / Testimonials Area */}
      {workExpData.length > 0 && <WorkExperience experiences={workExpData} />}

      {/* Blog Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest <span className="text-primary">Insights</span>
              </h2>
              <p className="text-lg text-gray-500">
                Thoughts on development, design, and technology.
              </p>
            </div>
            <Link to="/bloglist" className="text-primary font-semibold hover:underline">
              View all posts &rarr;
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