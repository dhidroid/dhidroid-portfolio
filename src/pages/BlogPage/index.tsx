import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { client } from "../../senity/senity";
import Loader from "../../components/loader/Loader";

const BlogPage = () => {
    const location = useLocation();
    const passedSlug = location.state?.slug; // Get slug from state
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = `*[_type == "post" && slug.current == "${passedSlug}"][0] {
                    title,
                    slug { current },
                    body[]{
                        _type == "block" => {
                            "style": style,
                            "children": children[]{
                                "text": text,
                                "marks": marks
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
                    author -> { name },
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

        if (passedSlug) fetchData();
    }, [passedSlug]);

    if (loading) return <Loader />;
    if (!blog) return (
        <center>
            <p>Blog not found!</p>
        </center>
       
    );

    // ✅ Prevent `map` error by checking if `blog.body` exists
    const renderContent = (body) => {
        if (!body || !Array.isArray(body)) return <p>No content available.</p>;

        return body.map((block, index) => {
            if (block.style === "h2") {
                return (
                    <h2 key={index} style={{ fontSize: "1.8em", marginTop: "20px" }}>
                        {block.children?.map((child, i) => (
                            <span key={i} style={{
                                fontWeight: child.marks?.includes("strong") ? "bold" : "normal",
                                fontStyle: child.marks?.includes("em") ? "italic" : "normal"
                            }}>
                                {child.text}
                            </span>
                        ))}
                    </h2>
                );
            } else if (block.style === "normal") {
                return (
                    <p key={index} style={{ fontSize: "1.2em", lineHeight: "1.8", marginBottom: "16px" }}>
                        {block.children?.map((child, i) => (
                            <span key={i} style={{
                                fontWeight: child.marks?.includes("strong") ? "bold" : "normal",
                                fontStyle: child.marks?.includes("em") ? "italic" : "normal"
                            }}>
                                {child.text}
                            </span>
                        ))}
                    </p>
                );
            } else if (block.imageUrl) {
                return (
                    <img
                        key={index}
                        src={block.imageUrl}
                        alt={block.alt || "Blog image"}
                        style={{ width: "100%", borderRadius: "8px", margin: "20px 0" }}
                    />
                );
            }
            return null;
        });
    };

    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Georgia, serif",  marginTop: "10%" }}>
            {blog.mainImage && (
                <img
                    src={blog.mainImage.asset.url}
                    alt={blog.mainImage.alt || "Main blog image"}
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "10px" }}
                />
            )}

            <h1 style={{ fontSize: "2.5em", marginTop: "20px" }}>{blog.title}</h1>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", color: "#555" }}>
                <p style={{ fontWeight: "bold", marginRight: "10px" }}>By {blog.author?.name}</p>
                <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>

            <p style={{ fontSize: "1.1em", fontWeight: "bold", color: "#888" }}>
                Categories: {blog.categories?.map(cat => cat.title).join(", ")}
            </p>

            <div style={{ marginTop: "20px" }}>{renderContent(blog.body)}</div>
        </div>
    );
};

export default BlogPage;
