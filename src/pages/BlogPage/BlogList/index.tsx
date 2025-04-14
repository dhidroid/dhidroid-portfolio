import React, { useState, useEffect } from 'react'
import Loader from '../../../components/loader/Loader'
import style from './index.module.css'
import { client } from '../../../senity/senity'
import { GoDotFill } from 'react-icons/go'
import { Helmet } from 'react-helmet'
import HomeBlogCard from '../../../components/Cards/HomeBlogCards'
import moment from 'moment'
import { useNavigate } from 'react-router'

const BlogList = () => {
    const navigation = useNavigate()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState([])
    const [blogData, setBlogData] = useState([])
    const [activeCategory, setActiveCategory] = useState('all')

    useEffect(() => {
        fetchCategory();
        fetchBlogData(activeCategory);
    }, [activeCategory])

    const fetchCategory = async () => {
        setLoading(true)
        try {
            const fetchData = await client.fetch(`*[_type == "category"]`);
            setCategory(fetchData)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchBlogData = async category => {
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
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return <Loader />
    }

    return (
        <React.Fragment>
            <Helmet></Helmet>
            <div className={style.container}>
                {/* Title */}
                <div className={style.titleContainer}>
                    <h1>Blogs List</h1>
                </div>

                {/* Inner container */}
                <div className={style.innerContainer}>

                    <div className={style.categoryContainer}>
                        {/* "All" Category */}
                        <p
                            className={activeCategory === 'all' ? style.active : ''}
                            onClick={() => setActiveCategory('all')}
                        >
                            All
                        </p>

                        {/* Dynamic categories */}
                        {category.map((data) => (
                            <p
                                key={data._id} // Ensure each element has a unique key
                                className={activeCategory === data.title ? style.active : ''}
                                onClick={() => setActiveCategory(data.title)}
                            >
                                {data.title}
                            </p>
                        ))}
                    </div>


                    {/* blogs  */}
                    {blogData.length === 0 && (
                        <div style={{
                            alignContent: "center",
                             display: "flex",
                             alignItems: "center",
                             justifyContent: "center",
                             flexDirection: "column",
                             marginTop: "20px",
                             fontSize: "20px",
                             height: "50vh"
                        }} className={style.noBlogs}>
                            <h1>No Blogs Found</h1>
                        </div>
                    )}
                    {/* blog container */}
                    <div className={style.blogContainer}>
                        {/* blog card */}
                        {blogData.map((data, index): any => (
                            <HomeBlogCard
                                BlogImage={data.mainImage.asset.url}
                                BlogTitle={data.title} Category=''
                                author={data.author.name}
                                date={moment(data?.publishedAt).format("DD MMM YYYY")} onPress={() => {
                                    navigation(`/blog/${data.slug.current}`, { state: { slug: data?.slug?.current } })
                                }} key={index} />
                        ))}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogList
