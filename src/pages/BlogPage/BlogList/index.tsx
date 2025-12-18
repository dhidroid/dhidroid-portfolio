import React, { useState, useEffect } from 'react';
import Loader from '../../../components/loader/Loader';
import { client } from '../../../senity/senity';
import SEO from '../../../components/SEO';
import { generateMetaForRoute } from '../../../utils/seo';
import HomeBlogCard from '../../../components/Cards/HomeBlogCards';
import { data, useNavigate } from 'react-router';
import { FiSearch } from 'react-icons/fi';
import { getIconForCategory } from '../../../utils/iconMapper';

const BlogList = () => {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<any[]>([]);
    const [blogData, setBlogData] = useState<any[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCategory();
        fetchBlogData(activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        // Filter blogs based on search query (title, author, and excerpt)
        if (searchQuery.trim() === '') {
            setFilteredBlogs(blogData);
        } else {
            const q = searchQuery.toLowerCase();
            const filtered = blogData.filter(blog =>
                blog.title?.toLowerCase().includes(q) ||
                blog.author?.name?.toLowerCase().includes(q) ||
                blog.excerpt?.toLowerCase().includes(q)
            );
            setFilteredBlogs(filtered);
        }
    }, [searchQuery, blogData]);

    // If the user types the exact category name, switch to that category filter automatically
    useEffect(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q || category.length === 0) return;
        const match = category.find(c => c.title?.toLowerCase() === q);
        if (match) {
            handleCategoryChange(match.title);
            setSearchQuery('');
        }
    }, [searchQuery, category]);

    const fetchCategory = async () => {
        setLoading(true);
        try {
            const fetchData = await client.fetch(`*[_type == "category"]`);
            setCategory(fetchData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogData = async (category: string) => {
        setLoading(true);
        try {
            let query = `
            *[_type == "post"${category !== 'all' ? ` && "${category}" in categories[]->title` : ''}] {
                title,
                slug { current },
                mainImage { asset->{_id, url}, alt },
                author -> { name, image { asset->{_id, url} } },
                categories[] -> { title },
                publishedAt,
                "excerpt": pt::text(body)[0...300],
                "bodyText": pt::text(body)
            } | order(publishedAt desc)`;

            const fetchData = await client.fetch(query);

            // Enrich posts with computed readingTime and ensure excerpt is present
            const enriched = fetchData.map((post: any) => {
                const text = (post.bodyText || post.excerpt || '').trim();
                const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
                return {
                    ...post,
                    readingTime: Math.max(1, Math.ceil(words / 200)),
                    excerpt: post.excerpt || (text.length ? `${text.slice(0, 300)}${text.length > 300 ? '…' : ''}` : ''),
                };
            });

            setBlogData(enriched);
            setFilteredBlogs(enriched);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (categoryTitle: string) => {
        setActiveCategory(categoryTitle);
        setSearchQuery(''); // Reset search when changing category
    };

    if (loading) {
        return <Loader />;
    }

    const metaTitle = `Blog | DhineshKumar Thirupathi`;
    const metaDesc = `Explore ${blogData.length} articles on web development, programming, and technology by DhineshKumar.`;

    return (
        <React.Fragment>
            {/* Use central SEO generator: prefer the first blog image if available */}
            <SEO
                title={metaTitle}
                description={metaDesc}
                keywords={["Blog", "Articles", "Dhidroid"]}
                image={blogData[0]?.mainImage?.asset?.url}
                route="/bloglist"
                url="/bloglist"
                structuredData={generateMetaForRoute('/bloglist', { title: metaTitle, description: metaDesc }).structuredData}
            />

            <div className="min-h-screen w-full bg-gradient-to-b from-[#050505] via-[#0a0a0f] to-[#050505] pt-32 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
                {/* Header Section */}
                <header style={{ fontFamily: "'BBH Bartle', sans-serif" }} className="mb-12 max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        Latest <span className="text-[#5315FC]">Blog Posts</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#5315FC] to-[#7B47FF] mb-6"></div>
                    <p style={{fontFamily:"'Urbanist', sans-serif"}} className="text-gray-400 text-lg md:text-xl mb-8">
                        Engineering insights, systems, and best practices for building reliable software at scale.
                    </p>
                </header>
                {/* Compact search in the sticky bar for quick access */}
                <div className="w-full mx-auto mb-4 flex justify-end">
                    <div className="relative w-full">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title, author, or type a category name to filter..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#5315FC]/30 focus:outline-none transition-all"
                            aria-label="Search blog posts"
                            data-testid="search-input-sticky"
                        />
                    </div>
                </div>
                {/* Filter Pills - Sticky */}
                <div className="top-28 z-30 bg-transparent backdrop-blur-sm py-6">
                    <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-3">
                            <button
                                className={`px-5 py-2 rounded-full flex items-center gap-2 font-medium text-sm transition-all duration-200 ${activeCategory === 'all'
                                    ? 'bg-[#5315FC]/10 text-[#5315FC] border border-[#5315FC]/20'
                                    : 'bg-white/3 border border-white/10 text-gray-300 hover:bg-white/6'
                                    }`}
                                onClick={() => handleCategoryChange('all')}
                                data-testid="category-all"
                            >
                                <span className="text-gray-300"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current"><path d="M20 12a2 2 0 0 1-2 2H6a2 2 0 0 1 0-4h12a2 2 0 0 1 2 2z" fill="currentColor" /></svg></span>
                                <span>All Posts ({blogData.length})</span>
                            </button>

                            {category.map((data) => {
                                const Icon = getIconForCategory(data.title);
                                return (
                                    <button
                                        key={data._id}
                                        className={`px-4 py-2 rounded-full flex items-center gap-2 font-medium text-sm transition-all duration-200 ${activeCategory === data.title
                                            ? 'bg-[#5315FC]/10 text-[#5315FC] border border-[#5315FC]/20'
                                            : 'bg-white/3 border border-white/10 text-gray-300 hover:bg-white/6'
                                            }`}
                                        onClick={() => handleCategoryChange(data.title)}
                                        data-testid={`category-${data.title}`}
                                        aria-pressed={activeCategory === data.title}
                                    >
                                        <Icon size={14} className={`${activeCategory === data.title ? 'text-[#5315FC]' : 'text-gray-300'}`} />
                                        <span className="truncate">{data.title}</span>
                                    </button>
                                );
                            })}

                            {/* auto-detect: if the search text matches a category name exactly, switch filter */}
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="max-w-7xl mx-auto mb-6">
                    <p className="text-gray-400 text-sm">
                        {searchQuery
                            ? `Found ${filteredBlogs.length} result${filteredBlogs.length !== 1 ? 's' : ''} for "${searchQuery}"`
                            : `Showing ${filteredBlogs.length} blog${filteredBlogs.length !== 1 ? 's' : ''}`}
                    </p>
                </div>

                {/* Featured Article (optional) */}
                {activeCategory === 'all' && filteredBlogs.length > 0 && (
                    (() => {
                        const sorted = [...filteredBlogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
                        const featured = sorted[0];
                        return (
                            <section onClick={() => {
                                navigation(`/blog/${featured.slug.current}`, {
                                    state: { slug: featured.slug.current }
                                })
                            }} className="max-w-7xl mx-auto mb-10 cursor-pointer">
                                <div className="bg-white/3 border border-white/6 rounded-xl overflow-hidden">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                                        <div className="md:col-span-2 p-6 flex flex-col justify-between">
                                            <div>
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#5315FC]/10 text-[#5315FC] border border-[#5315FC]/20">Featured</span>
                                                <h2 className="mt-4 text-3xl font-semibold text-white font-secondary leading-tight">{featured.title}</h2>
                                                <p className="mt-3 text-gray-300 max-w-3xl">{featured.excerpt}</p>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between text-sm text-gray-300">
                                                <div>
                                                    <span>{featured.author?.name || 'Anonymous'}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{new Date(featured.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                </div>
                                                <div className="text-gray-300">{featured.readingTime} min read</div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-1 h-64 md:h-auto">
                                            <img src={featured.mainImage?.asset?.url || 'https://via.placeholder.com/800x600'} alt={featured.title} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    })()
                )}

                {/* Blogs Grid */}
                <main className="max-w-7xl mx-auto">
                    {filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...filteredBlogs]
                                .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                                .slice(activeCategory === 'all' ? 1 : 0)
                                .map((data, index) => (
                                    <HomeBlogCard
                                        key={data.slug?.current || index}
                                        BlogImage={data.mainImage?.asset?.url || undefined}
                                        BlogTitle={data.title}
                                        categories={data.categories?.map((c: any) => c.title) || []}
                                        excerpt={data.excerpt}
                                        readingTime={data.readingTime}
                                        author={data.author?.name || 'Anonymous'}
                                        date={new Date(data.publishedAt)}
                                        onPress={() => {
                                            navigation(`/blog/${data.slug.current}`, {
                                                state: { slug: data?.slug?.current }
                                            });
                                        }}
                                    />
                                ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="text-center max-w-md">
                                <h2 className="text-2xl font-bold text-white mb-3">No Blogs Found</h2>
                                <p className="text-gray-400 mb-6">
                                    {searchQuery
                                        ? `No results found for "${searchQuery}"`
                                        : 'No blogs available in this category'}
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="px-6 py-3 rounded-full bg-[#5315FC] hover:bg-[#7B47FF] text-white font-semibold transition-all duration-300"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </React.Fragment>
    );
};

export default BlogList;