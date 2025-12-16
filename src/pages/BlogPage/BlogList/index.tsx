import React, { useState, useEffect } from 'react';
import Loader from '../../../components/loader/Loader';
import { client } from '../../../senity/senity';
import SEO from '../../../components/SEO';
import { generateMetaForRoute } from '../../../utils/seo';
import HomeBlogCard from '../../../components/Cards/HomeBlogCards';
import { useNavigate } from 'react-router';
import { FiSearch } from 'react-icons/fi';

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
        // Filter blogs based on search query
        if (searchQuery.trim() === '') {
            setFilteredBlogs(blogData);
        } else {
            const filtered = blogData.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredBlogs(filtered);
        }
    }, [searchQuery, blogData]);

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
                slug {
                    current
                },
                mainImage {
                    asset -> {
                        _id,
                        url
                    },
                    alt
                },
                author -> {
                    name,
                    image {
                        asset -> {
                            _id,
                            url
                        }
                    }
                },
                categories[] -> { title },
                publishedAt
            }`;

            const fetchData = await client.fetch(query);
            setBlogData(fetchData);
            setFilteredBlogs(fetchData);
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
                <header className="mb-12 max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold font-secondary text-white mb-4">
                        Latest <span className="text-[#5315FC]">Blog Posts</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#5315FC] to-[#7B47FF] mb-6"></div>
                    <p className="text-gray-400 text-lg md:text-xl mb-8">
                        Discover insights on web development, programming, and technology
                    </p>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search blogs by title or author..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#5315FC]/50 focus:outline-none transition-all backdrop-blur-sm"
                            data-testid="search-input"
                        />
                    </div>
                </header>

                {/* Filter Pills */}
                <div className="max-w-7xl mx-auto mb-12">
                    <div className="flex flex-wrap gap-3">
                        <button
                            className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${activeCategory === 'all'
                                    ? 'bg-gradient-to-r from-[#5315FC] to-[#7B47FF] text-white shadow-[0_10px_30px_rgba(83,21,252,0.4)] scale-105'
                                    : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 hover:border-[#5315FC]/50 hover:text-white backdrop-blur-sm'
                                }`}
                            onClick={() => handleCategoryChange('all')}
                            data-testid="category-all"
                        >
                            All Posts ({blogData.length})
                        </button>

                        {category.map((data) => (
                            <button
                                key={data._id}
                                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${activeCategory === data.title
                                        ? 'bg-gradient-to-r from-[#5315FC] to-[#7B47FF] text-white shadow-[0_10px_30px_rgba(83,21,252,0.4)] scale-105'
                                        : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 hover:border-[#5315FC]/50 hover:text-white backdrop-blur-sm'
                                    }`}
                                onClick={() => handleCategoryChange(data.title)}
                                data-testid={`category-${data.title}`}
                            >
                                {data.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Info */}
                <div className="max-w-7xl mx-auto mb-8">
                    <p className="text-gray-400 text-sm">
                        {searchQuery 
                            ? `Found ${filteredBlogs.length} result${filteredBlogs.length !== 1 ? 's' : ''} for "${searchQuery}"`
                            : `Showing ${filteredBlogs.length} blog${filteredBlogs.length !== 1 ? 's' : ''}`}
                    </p>
                </div>

                {/* Blogs Grid */}
                <main className="max-w-7xl mx-auto">
                    {filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...filteredBlogs]
                                .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                                .map((data, index) => (
                                    <HomeBlogCard
                                        key={index}
                                        BlogImage={data.mainImage?.asset?.url || 'https://via.placeholder.com/400x250'}
                                        BlogTitle={data.title}
                                        Category={data.categories?.[0]?.title || ''}
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