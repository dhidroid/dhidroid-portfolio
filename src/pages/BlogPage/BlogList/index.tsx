import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SEO from "../../../components/SEO";
import { generateMetaForRoute } from '../../../utils/seo';
import { Container } from "../../../components/ui/Container";
import { Badge } from "../../../components/ui/Badge";
import HomeBlogCard from "../../../components/Cards/HomeBlogCards";
import { client } from "../../../senity/senity";
import CTA from "../../../components/home/CTA";

const BlogList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);
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
          } catch (error) {
              console.error(error);
          } finally {
              setLoading(false);
          }
    };

        fetchPosts();
    }, []);

    return (
        <React.Fragment>
            <SEO
                title={generateMetaForRoute('/bloglist').title}
                description={generateMetaForRoute('/bloglist').description}
                route="/bloglist"
            />

            <section className="pt-32 pb-20 bg-gray-50 border-b border-gray-200">
                <Container className="text-center">
                    <Badge className="mb-6">Blog</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Writings & <span className="text-primary">Thoughts</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-500">
                        Insights on technology, design, and development.
                    </p>
                </Container>
            </section>

            <section className="py-24 bg-white">
                <Container>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <HomeBlogCard
                                  key={post.slug.current}
                                  BlogTitle={post.title}
                                  BlogImage={post.mainImage?.asset?.url}
                                  categories={post.categories?.map((c: any) => c.title) || []}
                                  excerpt={post.excerpt}
                                  readingTime={post.readingTime}
                                  author={post.author?.name || 'Dhinesh'}
                                  date={post.publishedAt}
                                  onPress={() => navigate(`/blog/${post.slug.current}`)}
                              />
                          ))}
                            </div>
                    )}
                </Container>
            </section>

            <CTA />
        </React.Fragment>
    );
};

export default BlogList;