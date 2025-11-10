import React, { useState, useEffect } from 'react';
import Loader from '../../../components/loader/Loader';
import style from './index.module.css';
import { client } from '../../../senity/senity';
import { Helmet } from 'react-helmet';
import HomeBlogCard from '../../../components/Cards/HomeBlogCards';
import moment from 'moment';
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

    return (
        <React.Fragment>
            <Helmet>
                <title>Blog List | DhineshKumar Thirupathi</title>
                <meta name="description" content="Explore articles on web development, programming, and technology" />
            </Helmet>
            <div className={style.container}>
                {/* Header Section */}
                <div className={style.headerSection}>
                    <div className={style.titleContainer}>
                        <h1 data-testid="blogs-list-title">Latest Blogs</h1>
                        <p className={style.subtitle}>
                            Discover insights on web development, programming, and technology
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className={style.searchContainer}>
                        <FiSearch className={style.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search blogs by title or author..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={style.searchInput}
                            data-testid="search-input"
                        />
                    </div>
                </div>

                {/* Inner container */}
                <div className={style.innerContainer}>
                    {/* Category Filter */}
                    <div className={style.categoryContainer}>
                        <button
                            className={`${style.categoryButton} ${activeCategory === 'all' ? style.active : ''}`}
                            onClick={() => handleCategoryChange('all')}
                            data-testid="category-all"
                        >
                            All Posts
                        </button>

                        {category.map((data) => (
                            <button
                                key={data._id}
                                className={`${style.categoryButton} ${activeCategory === data.title ? style.active : ''}`}
                                onClick={() => handleCategoryChange(data.title)}
                                data-testid={`category-${data.title}`}
                            >
                                {data.title}
                            </button>
                        ))}
                    </div>

                    {/* Blog Count */}
                    <div className={style.resultsInfo}>
                        <p>
                            {searchQuery ? `Found ${filteredBlogs.length} result${filteredBlogs.length !== 1 ? 's' : ''}` : `Showing ${filteredBlogs.length} blog${filteredBlogs.length !== 1 ? 's' : ''}`}
                        </p>
                    </div>

                    {/* No Blogs Found */}
                    {filteredBlogs.length === 0 && (
                        <div className={style.noBlogs}>
                            <div className={style.noBlogsContent}>
                                <h2>No Blogs Found</h2>
                                <p>
                                    {searchQuery
                                        ? `No results found for "${searchQuery}"`
                                        : 'No blogs available in this category'}
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className={style.clearSearchButton}
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Blog Container */}
                    <div className={style.blogContainer}>
                        {[...filteredBlogs]
                            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                            .map((data, index) => (
                                <HomeBlogCard
                                    key={index}
                                    BlogImage={data.mainImage?.asset?.url || 'https://via.placeholder.com/400x250'}
                                    BlogTitle={data.title}
                                    Category={data.categories?.[0]?.title || ''}
                                    author={data.author?.name || 'Anonymous'}
                                    date={moment(data?.publishedAt).format("DD MMM YYYY")}
                                    onPress={() => {
                                        navigation(`/blog/${data.slug.current}`, {
                                            state: { slug: data?.slug?.current }
                                        });
                                    }}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BlogList;