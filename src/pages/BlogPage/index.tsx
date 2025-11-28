import { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import { client } from "../../senity/senity";
import Loader from "../../components/loader/Loader";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { FiCopy, FiCheck } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { PortableText } from "@portabletext/react";

const BlogDetailsPage = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const slugFromParams = (params as any).slug || (params as any).id;
    const passedSlug = location.state?.slug;

    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedBlogs, setRecommendedBlogs] = useState<any[]>([]);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [aiSummary, setAiSummary] = useState<string>("");
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [showAiBar, setShowAiBar] = useState(false);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        const resolvedSlug = slugFromParams || passedSlug;

        if (!resolvedSlug) {
            setLoading(false);
            return;
        }

        const query = `*[_type == "post" && slug.current == $slug][0] {
            title,
            slug { current },
            body,
            mainImage { asset -> { url }, alt },
            author -> { name, image { asset -> { url } } },
            categories[] -> { title },
            publishedAt,
            "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
        }`;

        const queryParams = { slug: resolvedSlug };

        const fetchData = async () => {
            try {
                const response = await client.fetch(query, queryParams);
                setBlog(response);

                // Fetch recommended blogs
                if (response?.categories?.[0]?.title) {
                    const recQuery = `*[_type == "post" && slug.current != $slug && "${response.categories[0].title}" in categories[]->title][0...3] {
                        title,
                        slug { current },
                        mainImage { asset -> { url }, alt },
                        publishedAt,
                        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
                    }`;
                    const recBlogs = await client.fetch(recQuery, queryParams);
                    setRecommendedBlogs(recBlogs);
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slugFromParams, passedSlug]);

    // Initialize AI Worker
    useEffect(() => {
        const worker = new Worker(new URL('../../workers/ai-worker.js', import.meta.url), {
            type: 'module'
        });

        worker.onmessage = (e: MessageEvent) => {
            const { status, output } = e.data;
            if (status === 'complete' && output) {
                setAiSummary(output);
                setIsGeneratingSummary(false);
            }
        };

        workerRef.current = worker;

        return () => worker.terminate();
    }, []);

    const generateSummary = () => {
        if (!blog?.body) return;

        setShowAiBar(true);
        setIsGeneratingSummary(true);

        // Extract text from portable text
        const textContent = blog.body
            .filter((block: any) => block._type === 'block')
            .map((block: any) => block.children?.map((child: any) => child.text).join(''))
            .join('\n\n');

        workerRef.current?.postMessage({
            type: 'generate',
            text: `Summarize this blog post in 3-4 concise sentences:\n\n${textContent.slice(0, 2000)}`,
            context: ''
        });
    };

    const handleCopy = (code: string) => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };



    const portableTextComponents = {
        types: {
            code: ({ value }: any) => (
                <div className="relative my-6 rounded-xl overflow-hidden border border-white/10">
                    <div className="flex items-center justify-between bg-[#282c34] px-4 py-2 border-b border-white/10">
                        <span className="text-xs text-gray-400 font-mono">{value.language || 'code'}</span>
                        <button
                            onClick={() => handleCopy(value.code)}
                            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                        >
                            {copiedCode === value.code ? (
                                <><FiCheck /> Copied!</>
                            ) : (
                                <><FiCopy /> Copy</>
                            )}
                        </button>
                    </div>
                    <SyntaxHighlighter
                        language={value.language || 'javascript'}
                        style={atomOneDark}
                        customStyle={{ margin: 0, borderRadius: 0 }}
                    >
                        {value.code}
                    </SyntaxHighlighter>
                </div>
            ),
            image: ({ value }: any) => (
                <figure className="my-8">
                    <img
                        src={value.asset?.url}
                        alt={value.alt || ''}
                        className="w-full rounded-xl"
                    />
                    {value.alt && (
                        <figcaption className="text-center text-sm text-gray-400 mt-2">
                            {value.alt}
                        </figcaption>
                    )}
                </figure>
            ),
        },
        block: {
            h1: ({ children }: any) => (
                <h1 className="text-4xl font-bold mt-12 mb-6 text-white">{children}</h1>
            ),
            h2: ({ children }: any) => (
                <h2 className="text-3xl font-bold mt-10 mb-5 text-white">{children}</h2>
            ),
            h3: ({ children }: any) => (
                <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">{children}</h3>
            ),
            normal: ({ children }: any) => (
                <p className="text-lg leading-8 mb-6 text-gray-300">{children}</p>
            ),
            blockquote: ({ children }: any) => (
                <blockquote className="border-l-4 border-[#5315FC] pl-6 my-6 italic text-gray-300">
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }: any) => (
                <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300">{children}</ul>
            ),
            number: ({ children }: any) => (
                <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300">{children}</ol>
            ),
        },
        marks: {
            link: ({ children, value }: any) => (
                <a
                    href={value.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5315FC] hover:text-[#7B47FF] underline"
                >
                    {children}
                </a>
            ),
            code: ({ children }: any) => (
                <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-[#A99DFF]">
                    {children}
                </code>
            ),
        },
    };

    if (loading) return <Loader />;

    if (!blog) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-b from-[#050505] to-[#0a0a0f] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Blog not found!</h2>
                    <button
                        onClick={() => navigate("/bloglist")}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5315FC] hover:bg-[#7B47FF] text-white font-semibold transition-all"
                    >
                        <FaArrowLeft /> Back to Blogs
                    </button>
                </div>
            </div>
        );
    }

    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const imageUrl = blog.mainImage?.asset?.url || '';
    const description = blog.body?.[0]?.children?.[0]?.text?.slice(0, 160) || 'Read this insightful article by DhineshKumar Thirupathi, a Full Stack Developer specializing in React, React Native, and modern web technologies.';
    const keywords = [
        blog.title,
        ...((blog.categories || []).map((cat: any) => cat.title)),
        'DhineshKumar Thirupathi',
        'dhidroid',
        'Full Stack Developer',
        'React Developer',
        'React Native',
        'Web Development',
        'Mobile App Development',
        'Blog',
        'Tech Article'
    ].filter(Boolean).join(', ');

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: description,
                    url: pageUrl
                });
            } catch (err) {
                console.log('Share canceled or failed:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(pageUrl);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>{blog.title} | DhineshKumar Thirupathi - Full Stack Developer</title>
                <meta name="title" content={`${blog.title} | DhineshKumar Thirupathi`} />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content="DhineshKumar Thirupathi (dhidroid)" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="dhidroid - DhineshKumar Thirupathi" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:image:secure_url" content={imageUrl} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={blog.title} />
                <meta property="article:published_time" content={blog.publishedAt} />
                <meta property="article:modified_time" content={blog.publishedAt} />
                <meta property="article:author" content={blog.author?.name || 'DhineshKumar Thirupathi'} />
                <meta property="article:section" content={blog.categories?.[0]?.title || 'Technology'} />
                <meta property="article:tag" content={keywords} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@dhidroid" />
                <meta name="twitter:creator" content="@dhidroid" />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
                <meta name="twitter:image:alt" content={blog.title} />

                {/* LinkedIn */}
                <meta property="og:linkedin:owner" content="DhineshKumar Thirupathi" />

                {/* Additional Meta Tags */}
                <meta name="theme-color" content="#5315FC" />
                <meta name="msapplication-TileColor" content="#5315FC" />
                <meta name="application-name" content="dhidroid" />
                <meta name="apple-mobile-web-app-title" content="dhidroid" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />

                {/* Language and Region */}
                <meta httpEquiv="content-language" content="en-US" />
                <meta name="language" content="English" />
                <meta name="geo.region" content="IN-TN" />
                <meta name="geo.placename" content="India" />

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": blog.title,
                        "description": description,
                        "image": imageUrl,
                        "datePublished": blog.publishedAt,
                        "dateModified": blog.publishedAt,
                        "author": {
                            "@type": "Person",
                            "name": blog.author?.name || "DhineshKumar Thirupathi",
                            "alternateName": "dhidroid",
                            "url": "https://dhidroid.vercel.app",
                            "jobTitle": "Full Stack Developer",
                            "description": "Passionate Full Stack Developer specializing in React, React Native, Node.js, and modern web technologies. Building innovative solutions for web and mobile platforms.",
                            "sameAs": [
                                "https://github.com/dhidroid",
                                "https://linkedin.com/in/dhidroid",
                                "https://twitter.com/dhidroid"
                            ]
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "dhidroid",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://dhidroid.vercel.app/logo.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": pageUrl
                        },
                        "articleSection": blog.categories?.[0]?.title || "Technology",
                        "keywords": keywords,
                        "url": pageUrl
                    })}
                </script>

                {/* Breadcrumb Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://dhidroid.vercel.app"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Blog",
                                "item": "https://dhidroid.vercel.app/bloglist"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": blog.title,
                                "item": pageUrl
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <div className="min-h-screen w-full bg-gradient-to-b from-[#050505] to-[#0a0a0f] pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button and Share Button */}
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => navigate("/bloglist")}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to all blogs</span>
                        </button>

                        {/* Native Share Button - Liquid Glass Effect */}
                        <button
                            onClick={handleNativeShare}
                            className="relative group"
                            aria-label="Share this article"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#5315FC]/20 to-[#7B47FF]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                                <IoShareOutline className="text-white" size={20} />
                            </div>
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content */}
                        <article className="flex-1 max-w-3xl">
                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {blog.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-white/10">
                                {blog.author?.image?.asset?.url && (
                                    <img
                                        src={blog.author.image.asset.url}
                                        alt={blog.author.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                )}
                                <div>
                                    <p className="text-white font-medium">{blog.author?.name}</p>
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        <span>•</span>
                                        <span>{blog.estimatedReadingTime || 5} min read</span>
                                    </div>
                                </div>
                            </div>

                            {/* AI Summary Bar */}
                            {showAiBar && (
                                <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#5315FC]/10 to-[#7B47FF]/10 border border-[#5315FC]/30 p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5315FC] to-[#7B47FF] flex items-center justify-center flex-shrink-0">
                                            <BsStars className="text-white" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                                                AI Summary
                                                {isGeneratingSummary && (
                                                    <span className="text-xs text-gray-400 animate-pulse">Generating...</span>
                                                )}
                                            </h3>
                                            {isGeneratingSummary ? (
                                                <div className="space-y-2">
                                                    <div className="h-4 bg-white/5 rounded animate-pulse"></div>
                                                    <div className="h-4 bg-white/5 rounded animate-pulse w-5/6"></div>
                                                    <div className="h-4 bg-white/5 rounded animate-pulse w-4/6"></div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-300 leading-relaxed">{aiSummary}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* AI Generate Button */}
                            {!showAiBar && (
                                <button
                                    onClick={generateSummary}
                                    className="mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#5315FC] to-[#7B47FF] text-white font-semibold hover:shadow-[0_10px_30px_rgba(83,21,252,0.4)] transition-all"
                                >
                                    <BsStars /> Generate AI Summary
                                </button>
                            )}

                            {/* Featured Image */}
                            {blog.mainImage?.asset?.url && (
                                <img
                                    src={blog.mainImage.asset.url}
                                    alt={blog.mainImage.alt || blog.title}
                                    className="w-full rounded-2xl mb-12"
                                />
                            )}

                            {/* Blog Content */}
                            <div className="prose prose-invert max-w-none">
                                {blog.body && <PortableText value={blog.body} components={portableTextComponents} />}
                            </div>
                        </article>

                        {/* Sidebar - Recommended Blogs */}
                        <aside className="lg:w-80 flex-shrink-0">
                            <div className="sticky top-24 space-y-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Recommended Reading</h3>
                                {recommendedBlogs.length > 0 ? (
                                    <div className="space-y-4">
                                        {recommendedBlogs.map((recBlog, index) => (
                                            <div
                                                key={index}
                                                onClick={() => navigate(`/blog/${recBlog.slug.current}`)}
                                                className="group cursor-pointer bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#5315FC]/50 transition-all hover:shadow-[0_10px_30px_rgba(83,21,252,0.2)]"
                                            >
                                                {recBlog.mainImage?.asset?.url && (
                                                    <img
                                                        src={recBlog.mainImage.asset.url}
                                                        alt={recBlog.title}
                                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                                    />
                                                )}
                                                <h4 className="text-white font-semibold mb-2 group-hover:text-[#A99DFF] line-clamp-2 transition-colors">
                                                    {recBlog.title}
                                                </h4>
                                                <p className="text-sm text-gray-400">
                                                    {new Date(recBlog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    {recBlog.estimatedReadingTime && ` • ${recBlog.estimatedReadingTime} min read`}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">No recommendations available</p>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetailsPage;