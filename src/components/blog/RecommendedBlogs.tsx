import React from "react";
import { Container } from "../ui/Container";
import BlogCard from "./BlogCard";

interface RecommendedBlogsProps {
    currentSlug: string;
    posts: any[];
}

const RecommendedBlogs: React.FC<RecommendedBlogsProps> = ({ currentSlug, posts }) => {
    // Filter out the current post if it happens to be in the list
    const filteredPosts = posts.filter(post => post.slug.current !== currentSlug).slice(0, 3);

    if (filteredPosts.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50 border-t border-gray-200">
            <Container>
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-12">
                    <h2 className="text-3xl font-bold font-display text-slate-900">
                        Recommended Reading
                    </h2>
                    <a href="/bloglist" className="text-primary font-medium hover:underline mt-4 md:mt-0">
                        View all articles
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                    {filteredPosts.map((post) => (
                        <BlogCard
                            key={post._id}
                            title={post.title}
                            slug={post.slug.current}
                            image={post.mainImage?.asset?.url}
                            date={post.publishedAt}
                            readingTime={post.readingTime}
                            category={post.categories?.[0]?.title}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default RecommendedBlogs;
