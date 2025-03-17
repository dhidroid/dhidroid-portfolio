import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { client } from "../../senity/senity";
import Loader from "../../components/loader/Loader";
import Helmet from "react-helmet";
import styles from "./BlogDetails.module.css";
import { FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";

const BlogPage = () => {
    const location = useLocation();
    const { slug } = useParams();
    const passedSlug = location.state?.slug;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("preview data <-------------><---------------->", slug || passedSlug);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = `*[_type == "post" && slug.current == "${slug || passedSlug}"][0] {
                    title,
                    slug { current },
                    body[]{
                        _type == "block" => {
                            "style": style,
                            "listItem": listItem,
                            "children": children[]{
                                "text": text,
                                "marks": marks,
                                "href": select(marks[0] == "link" => markDefs[0].href, null)
                            }
                        },
                        _type == "image" => {
                            "imageUrl": asset->url,
                            "alt": alt
                        }
                    },
                    mainImage {
                        asset -> { url },
                        alt
                    },
                    author -> { name, image { asset -> { url } } },
                    categories[] -> { title },
                    publishedAt
                }`;

                const response = await client.fetch(query);
                setBlog(response);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug || passedSlug) fetchData();
    }, [slug, passedSlug]);

    if (loading) return <Loader />;
    if (!blog) return <center><p>Blog not found!</p></center>;

    const shareUrl = window.location.href;

    const shareBlog = () => {
        const shareData = {
            title: blog.title,
            text: "Check out this blog: " + blog.title,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch((error) => console.error("Error sharing:", error));
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

    const renderContent = (body) => {
        if (!body || !Array.isArray(body)) return <p>No content available.</p>;

        return body.map((block, index) => {
            if (block.listItem === "bullet") {
                return (
                    <ul key={index} style={{ paddingLeft: "20px" }}>
                        {block.children.map((child, i) => (
                            <li key={i} className={styles.blogText}>{child.text}</li>
                        ))}
                    </ul>
                );
            } else if (block.style) {
                switch (block.style) {
                    case "h1":
                        return <h1 key={index} className={styles.blogTitle}>{block.children.map(child => child.text)}</h1>;
                    case "h2":
                        return <h2 key={index} className={styles.blogTitle}>{block.children.map(child => child.text)}</h2>;
                    case "blockquote":
                        return <blockquote key={index} style={{ fontStyle: "italic", borderLeft: "4px solid #ccc", paddingLeft: "10px" }}>{block.children.map(child => child.text)}</blockquote>;
                    case "normal":
                        return <p key={index} className={styles.blogText}>
                            {block.children.map((child, i) => (
                                child.marks?.includes("em")
                                    ? <em key={i}>{child.text}</em>
                                    : child.href
                                        ? <a key={i} href={child.href} target="_blank" rel="noopener noreferrer">{child.text}</a>
                                        : child.text
                            ))}
                        </p>;
                    default:
                        return null;
                }
            } else if (block.imageUrl) {
                return <img key={index} src={block.imageUrl} alt={block.alt || "Blog image"} className={styles.responsiveImage} />;
            }
            return null;
        });
    };

    return (
        <>
            <Helmet>
                <title>{blog.title} | DhineshKumar Thirupathi</title>
                <meta name="description" content={blog.body?.[0]?.children?.map(child => child.text).join(" ").substring(0, 150) || "Read an interesting blog on " + blog.title} />
                <meta name="keywords" content={["dhidroid", "dhineshkumar", "dhineshkumar thirupathi", ...(blog.categories?.map(cat => cat.title) || [])].join(", ")} />
                <meta name="author" content="DhineshKumar Thirupathi" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={blog.title} />
                <meta property="og:image" content={blog.mainImage?.asset?.url} />
                <meta property="og:description" content={blog.body?.[0]?.children?.map(child => child.text).join(" ").substring(0, 150)} />
            </Helmet>
            <div className={styles.blogContainer}>
                <center>
                    <h1 className={styles.blogTitle}>Blogs</h1>
                    <p className={styles.blogDetails}>Blog Details - <span>{blog.title}</span></p>
                </center>
            </div>
            <div className={styles.blogContent}>
                {blog.mainImage && <img src={blog.mainImage.asset.url} alt={blog.mainImage.alt || "Main blog image"} className={styles.blogImage} />}
                <h1 className={styles.blogTitle}>{blog.title}</h1>
                <div className={styles.authorContainer}>
                    {blog.author?.image?.asset?.url && <img src={blog.author.image.asset.url} alt="Author" className={styles.authorImage} />}
                    <div>
                        <p style={{ fontWeight: "bold", margin: "0" }}>By {blog.author?.name}</p>
                        <p style={{ margin: "0", fontSize: "0.9em" }}>{new Date(blog.publishedAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div>
                    {blog?.categories?.map((cat, index) => (
                        <span key={index} className={styles.categoryTag}>{cat.title}</span>
                    ))}
                </div>
                {/* social media */}
                <div className={styles.socialShare}>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={35} className={styles.shareIcon} />
                    </a>

                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer">
                        <RiTwitterXFill size={35} className={styles.shareIcon} />
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={35} className={styles.shareIcon} />
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={35} className={styles.shareIcon} />
                    </a>
                    <a onClick={shareBlog} target="_blank" rel="noopener noreferrer">
                        <IoShareOutline size={35} className={styles.shareIcon} />
                    </a>
                </div>
                <div>{renderContent(blog?.body)}</div>
            </div>
        </>
    );
};

export default BlogPage;
