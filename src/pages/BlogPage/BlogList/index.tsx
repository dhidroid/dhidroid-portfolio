import React, { useEffect, useState } from "react";
import SEO from "../../../components/SEO";
import { generateMetaForRoute } from '../../../utils/seo';
import { Container } from "../../../components/ui/Container";
import { client } from "../../../senity/senity";
import CTA from "../../../components/home/CTA";
import BlogIntro from "../../../components/blog/BlogIntro";
import BlogCard from "../../../components/blog/BlogCard";

const BlogList = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
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
          } | order(publishedAt desc)`;

              const data = await client.fetch(query);

              const enriched = data.map((post: any) => {
                  const text = (post.bodyText || post.excerpt || '').trim();
                  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
                  return {
                      ...post,
                      readingTime: Math.max(1, Math.ceil(words / 200)),
                      excerpt: post.excerpt || (text.length ? `${text.slice(0, 200)}...` : ''),
                  };
              });

              setPosts(enriched);
                setFilteredPosts(enriched);

                // Extract unique categories
                const allCats = enriched.flatMap((p: any) => p.categories?.map((c: any) => c.title) || []);
                setCategories(["All", ...Array.from(new Set(allCats)) as string[]]);

          } catch (error) {
              console.error(error);
          } finally {
              setLoading(false);
          }
    };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(p =>
                p.categories?.some((c: any) => c.title === selectedCategory)
            ));
        }
    }, [selectedCategory, posts]);

    return (
        <React.Fragment>
            <SEO
                title={generateMetaForRoute('/bloglist').title}
                description={generateMetaForRoute('/bloglist').description}
                url={generateMetaForRoute('/bloglist').canonical}
            />

            <main className="bg-white min-h-screen">
                <BlogIntro />

                <Container className="max-w-[1800px] px-6 pb-32">
                    {/* Category Filter */}
                    <div className="flex gap-6 mb-16 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-sm font-medium uppercase tracking-widest transition-colors whitespace-nowrap flex-shrink-0 ${selectedCategory === cat ? 'text-black border-b border-black' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                                {filteredPosts.map((post) => (
                                    <BlogCard
                                        key={post.slug.current}
                                        title={post.title}
                                        slug={post.slug.current}
                                        image={post.mainImage?.asset?.url}
                                        category={post.categories?.[0]?.title}
                                        date={post.publishedAt}
                                        readingTime={post.readingTime}
                                    />
                                ))}
                            </div>
                    )}
                </Container>
            </main>

            <CTA />
        </React.Fragment>
    );
};

export default BlogList;