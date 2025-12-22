import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import SEO from "../../components/SEO";
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { client } from "../../senity/senity";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import CTA from "../../components/home/CTA";
import MarkdownRenderer from "../../components/blog/MarkdownRenderer";
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

// Re-using the same styling logic for Portable Text to match MarkdownRenderer
const PortableTextRenderer = ({ value }: { value: any }) => {
    return (
        <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-slate-900 prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-gray-800 prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-lg">
            <PortableText
                value={value}
                components={{
                    types: {
                        image: ({ value }) => {
                            if (!value?.asset?._ref) {
                                return null;
                            }
                            return (
                                <figure className="my-10">
                                    <img
                                        src={urlFor(value).width(800).fit('max').auto('format').url()}
                                        alt={value.alt || 'Blog Image'}
                                        className="w-full h-auto rounded-xl shadow-md"
                                        loading="lazy"
                                    />
                                    {value.caption && (
                                        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                                            {value.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        },
                        code: ({ value }) => {
                            return (
                                <div className="rounded-xl overflow-hidden my-8 shadow-2xl border border-gray-800">
                                    {/* Mac Terminal Header */}
                                    <div className="flex items-center px-4 py-2 bg-[#1a1b26] border-b border-gray-700/50">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <div className="ml-4 text-xs text-gray-400 font-mono">
                                            {value.language || 'code'}
                                        </div>
                                    </div>
                                    <SyntaxHighlighter
                                        style={atomDark}
                                        language={value.language || 'text'}
                                        PreTag="div"
                                        customStyle={{
                                            margin: 0,
                                            padding: "1.5rem",
                                            background: "#1a1b26",
                                            fontSize: "0.9rem",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {value.code}
                                    </SyntaxHighlighter>
                                </div>
                            );
                        }
                    },
                    block: {
                        h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 text-slate-900">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 group flex items-center">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">{children}</h3>,
                        normal: ({ children }) => <p className="mb-6 leading-8 text-gray-600/90 text-[1.125rem]">{children}</p>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-gray-800 bg-gray-50 rounded-r-lg">{children}</blockquote>,
                    },
                    list: {
                        bullet: ({ children }) => <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-600">{children}</ul>,
                        number: ({ children }) => <ol className="list-decimal pl-6 mb-8 space-y-2 text-gray-600">{children}</ol>,
                    },
                    marks: {
                        link: ({ value, children }) => {
                            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
                            return (
                                <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="text-primary hover:underline font-medium">
                                    {children}
                                </a>
                            )
                        },
                    }
                }}
            />
        </div>
    )
}

const BlogPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Updated query to fetch specific fields needed
                const query = `
          *[_type == "post" && slug.current == $slug][0] {
            title,
            mainImage { asset->{_id, url}, alt },
            author -> { name, image { asset->{_id, url} } },
            categories[] -> { title },
            publishedAt,
            body,
            "bodyText": pt::text(body)
          }
        `;
                const data = await client.fetch(query, { slug });

                // Calculate reading time
                if (data) {
                    const text = (data.bodyText || data.body || '').trim();
                    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
                    data.readingTime = Math.max(1, Math.ceil(words / 200));
                }

                setPost(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <Link to="/bloglist" className="text-primary hover:underline">
                    Back to Blog
                </Link>
            </div>
        );
    }

    const isMarkdown = typeof post.body === 'string';
    const hasContent = post.body; 


    return (
        <React.Fragment>
            <SEO
                title={`${post.title} | Blog`}
                description={post.bodyText?.slice(0, 160) || "Read this article on my portfolio."}
                route={`/blog/${slug}`}
                image={post.mainImage?.asset?.url}
                type="article"
            />

            <article className="bg-white min-h-screen">
                {/* Navigation / Breadcrumb */}
                <div className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-30">
                    <Container className="py-4">
                        <Link to="/bloglist" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors font-medium">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Blog
                        </Link>
                    </Container>
                </div>

                {/* Hero Header */}
                <section className="pt-12 pb-12 lg:pt-20 lg:pb-16 bg-white">
                    <Container className="max-w-[800px] text-center">
                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {post.categories?.map((cat: any) => (
                                <Badge key={cat.title} variant="secondary" className="bg-primary/5 text-primary border-primary/10 hover:bg-primary/10 px-4 py-1.5 text-sm">
                                    {cat.title}
                                </Badge>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-8 leading-[1.15] text-slate-900 tracking-tight">
                            {post.title}
                        </h1>

                        {/* Metadata (Author, Date, Time) */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500 text-base border-t border-b border-gray-100 py-6">
                            <div className="flex items-center gap-3">
                                {post.author?.image ? (
                                    <img src={post.author.image.asset.url} alt={post.author.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        D
                                    </div>
                                )}
                                <div className="text-left">
                                    <div className="font-bold text-slate-900 leading-none mb-1">{post.author?.name || 'Dhinesh'}</div>
                                    <div className="text-xs text-gray-400">Author</div>
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-8 bg-gray-200" />

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>{post.readingTime} min read</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Feature Image */}
                {post.mainImage && (
                    <Container className="max-w-5xl mb-16 px-4 sm:px-6">
                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50 aspect-[21/9] relative">
                            <img 
                                src={post.mainImage.asset.url}
                                alt={post.mainImage.alt || post.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </Container>
                )}

                {/* Main Content */}
                <section className="pb-24">
                    <Container className="max-w-[720px] px-6">
                        {hasContent ? (
                            isMarkdown ? (
                                <MarkdownRenderer content={post.body} />
                            ) : (
                                <PortableTextRenderer value={post.body} />
                            )
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <p className="text-gray-500">
                                    No content available for this post.
                                </p>
                            </div>
                        )}
                    </Container>
                </section>

                {/* Divider / Share / Tags could go here */}

            </article>

            <CTA />
        </React.Fragment>
    );
};

export default BlogPage;