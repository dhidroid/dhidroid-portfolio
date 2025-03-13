import React from 'react'
import Loader from '../../../components/loader/Loader'
import style from './index.module.css'
import { client } from '../../../senity/senity'
import { GoDotFill } from 'react-icons/go'

const BlogList = () => {
    const [loading, setLoading] = React.useState(false)
    const [category, setCategory] = React.useState([])
    const [blogData, setBlogData] = React.useState([])

    React.useEffect(() => {
        fetchCatagory();
        fetchBlogData();
    }, [])

    const fetchCatagory = async () => {
        setLoading(true)
        try {
            const fetchData = await client.fetch(`*[_type == "category"]`);
            setCategory(fetchData)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchBlogData = async () => {
        setLoading(true)
        try {
            const fetchData = await client.fetch(`*[_type == "post"]`);
            setBlogData(fetchData);
            console.log(fetchData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className={style.container}>
            {/* title */}
            <div className={style.titleContainer}>
                <h1>Blogs List</h1>
                <p>Home
                    <GoDotFill />
                    <span>My Blog List</span></p>
            </div>

            <div className={style.innerContainer}></div>
        </div>
    )
}

export default BlogList