import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import { client } from "../../senity/senity";
import Loader from "../../components/loader/Loader";
import Helmet from "react-helmet";
import styles from "./BlogDetails.module.css";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import SyntaxHighlighter from "react-syntax-highlighter";
import darcula from "react-syntax-highlighter/dist/esm/styles/hljs/darcula";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy, FiCheck } from "react-icons/fi";

const BlogPage = () => {
    const location = useLocation();
    const params = useParams();
    // routes use :id in router, but some navigations/state use slug — support both
    const slugFromParams = (params as any).slug || (params as any).id;
    const navigate = useNavigate();
    const passedSlug = location.state?.slug;
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [copiedLink, setCopiedLink] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const resolvedSlug = slugFromParams || passedSlug;

                // Fixed: Use Sanity's parameterized queries instead of template literals
                const query = `*[_type == "post" && slug.current == $slug][0] {
                    title,
                    slug { current },
                    body[]{
                        ..., 
                        _type == "image" => {"asset": asset-> { url }, alt}
                    },
                    mainImage { asset -> { url }, alt },
                    author -> { name, image { asset -> { url } } },
                    categories[] -> { title },
                    publishedAt
                }`;

                // Pass the slug as a parameter
                const response = await client.fetch(query, { slug: resolvedSlug });

                console.log("Fetched blog:", response); // Debug log
                setBlog(response);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        const resolvedSlug = slugFromParams || passedSlug;
        console.log("Resolved slug:", resolvedSlug); // Debug log
        if (resolvedSlug) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [slugFromParams, passedSlug]);

    const handleCopy = (code: string) => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    if (loading) return <Loader />;
    if (!blog) {
        return (
            <div className={styles.notFound}>
                <h2>Blog not found!</h2>
                <button onClick={() => navigate("/bloglist")} className={styles.backButton}>
                    <FaArrowLeft /> Back to Blogs
                </button>
            </div>
        );
    }

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

    // Enhanced content renderer with better styling
    const renderContent = (body: any) => {
        if (!body || !Array.isArray(body)) return <p>No content available.</p>;

        return body.map((block: any, index: number) => {
            if (block._type === "block") {
                switch (block.style) {
                    case "h1":
                        return (
                            <h1 key={index} className={styles.contentH1}>
                                {block.children.map((child: any) => child.text).join("")}
                            </h1>
                        );
                    case "h2":
                        return (
                            <h2 key={index} className={styles.contentH2}>
                                {block.children.map((child: any) => child.text).join("")}
                            </h2>
                        );
                    case "h3":
                        return (
                            <h3 key={index} className={styles.contentH3}>
                                {block.children.map((child: any) => child.text).join("")}
                            </h3>
                        );
                    case "h4":
                        return (
                            <h4 key={index} className={styles.contentH4}>
                                {block.children.map((child: any) => child.text).join("")}
                            </h4>
                        );
                    case "blockquote":
                        return (
                            <blockquote key={index} className={styles.quote}>
                                {block.children.map((child: any) => child.text).join("")}
                            </blockquote>
                        );
                    case "normal":
                    default:
                        return (
                            <p key={index} className={styles.blogText}>
                                {block.children.map((child: any, i: number) => {
                                    let content = child.text;

                                    if (child.marks?.includes("strong")) {
                                        content = <strong key={i}>{content}</strong>;
                                    }
                                    if (child.marks?.includes("em")) {
                                        content = <em key={i}>{content}</em>;
                                    }
                                    if (child.marks?.includes("code")) {
                                        content = <code key={i} className={styles.inlineCode}>{content}</code>;
                                    }
                                    if (child.marks?.includes("underline")) {
                                        content = <u key={i}>{content}</u>;
                                    }
                                    if (child.href) {
                                        content = (
                                            <a
                                                key={i}
                                                href={child.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                            >
                                                {content}
                                            </a>
                                        );
                                    }

                                    return content;
                                })}
                            </p>
                        );
                }
            } else if (block._type === "list") {
                const ListTag = block.listItem === "bullet" ? "ul" : "ol";
                return (
                    <ListTag key={index} className={styles.list}>
                        {block.children?.map((item: any, i: number) => (
                            <li key={i} className={styles.listItem}>
                                {item.text}
                            </li>
                        ))}
                    </ListTag>
                );
            } else if (block._type === "code") {
                const codeContent = block.code || "";
                const language = block.language || "javascript";

                return (
                    <div key={index} className={styles.codeBlock}>
                        <div className={styles.codeHeader}>
                            <span className={styles.codeLanguage}>{language}</span>
                            <CopyToClipboard text={codeContent} onCopy={() => handleCopy(codeContent)}>
                                <button className={styles.copyButton}>
                                    {copiedCode === codeContent ? (
                                        <>
                                            <FiCheck /> Copied!
                                        </>
                                    ) : (
                                        <>
                                            <FiCopy /> Copy
                                        </>
                                    )}
                                </button>
                            </CopyToClipboard>
                        </div>
                        <SyntaxHighlighter
                            language={language}
                            style={darcula}
                            customStyle={{
                                margin: 0,
                                borderRadius: "0 0 8px 8px",
                                fontSize: "0.9rem"
                            }}
                        >
                            {codeContent}
                        </SyntaxHighlighter>
                    </div>
                );
            } else if (block._type === "image") {
                const imgSrc = block.asset?.url || block.asset?.asset?.url || null;

                return (
                    <img
                        key={index}
                        src={imgSrc || undefined}
                        alt={block.alt || "Blog image"}
                        className={styles.responsiveImage}
                        style={{ maxWidth: "100%", height: "auto", display: "block" }}
                        loading="lazy"
                        onError={(e: any) => {
                            // hide broken images gracefully
                            e.currentTarget.style.display = "none";
                        }}
                    />
                );
            }

            return null;
        });
    };

    const shareUrl = window.location.href;
    const readingTime = blog.body ? Math.ceil(blog.body.length / 3) : 5;

    const copyLinkWithPreview = async () => {
        const imageUrl = blog.mainImage?.asset?.url || "";
        const sep = shareUrl.includes("?") ? "&" : "?";
        const urlWithPreview = `${shareUrl}${sep}previewImage=${encodeURIComponent(imageUrl)}`;

        try {
            await navigator.clipboard.writeText(urlWithPreview);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
            alert("Unable to copy link to clipboard. Please copy manually: " + urlWithPreview);
        }
    };

    return (
        <>
            <Helmet>
                {/* Basic Meta Tags */}
                <title>{blog.title} | DhineshKumar Thirupathi</title>
                <meta name="description" content={blog.body?.[0]?.children?.map((child: any) => child.text).join(" ").substring(0, 160) || "Read an interesting blog on " + blog.title} />
                <meta name="keywords" content={["dhidroid", "dhineshkumar", "dhineshkumar thirupathi", ...(blog.categories?.map((cat: any) => cat.title) || [])].join(", ")} />
                <meta name="author" content="DhineshKumar Thirupathi" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <link rel="canonical" href={window.location.href} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.body?.[0]?.children?.map((child: any) => child.text).join(" ").substring(0, 160) || "Read an interesting blog on " + blog.title} />
                <meta property="og:image" content={blog.mainImage?.asset?.url || "https://yourdomain.com/default-blog-image.jpg"} />
                <meta property="og:image:secure_url" content={blog.mainImage?.asset?.url || "https://yourdomain.com/default-blog-image.jpg"} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={blog.mainImage?.alt || blog.title} />
                <meta property="og:site_name" content="DhineshKumar Thirupathi" />
                <meta property="article:published_time" content={blog.publishedAt} />
                <meta property="article:author" content={blog.author?.name || "DhineshKumar Thirupathi"} />
                {blog.categories?.map((cat: any, idx: number) => (
                    <meta key={idx} property="article:tag" content={cat.title} />
                ))}

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={window.location.href} />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={blog.body?.[0]?.children?.map((child: any) => child.text).join(" ").substring(0, 160) || "Read an interesting blog on " + blog.title} />
                <meta name="twitter:image" content={blog.mainImage?.asset?.url || "https://yourdomain.com/default-blog-image.jpg"} />
                <meta name="twitter:image:alt" content={blog.mainImage?.alt || blog.title} />
                <meta name="twitter:creator" content="@dhidroid" />
                <meta name="twitter:site" content="@dhidroid" />

                {/* Additional SEO Tags */}
                <meta name="theme-color" content="#000000" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": blog.title,
                        "image": blog.mainImage?.asset?.url || "https://yourdomain.com/default-blog-image.jpg",
                        "datePublished": blog.publishedAt,
                        "dateModified": blog.publishedAt,
                        "author": {
                            "@type": "Person",
                            "name": blog.author?.name || "DhineshKumar Thirupathi",
                            "image": blog.author?.image?.asset?.url
                        },
                        "publisher": {
                            "@type": "Person",
                            "name": "DhineshKumar Thirupathi",
                            "logo": {
                                "@type": "ImageObject",
                                "url": blog.author?.image?.asset?.url || "https://yourdomain.com/logo.png"
                            }
                        },
                        "description": blog.body?.[0]?.children?.map((child: any) => child.text).join(" ").substring(0, 160) || "Read an interesting blog on " + blog.title,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": window.location.href
                        },
                        "keywords": ["dhidroid", "dhineshkumar", "dhineshkumar thirupathi", ...(blog.categories?.map((cat: any) => cat.title) || [])].join(", ")
                    })}
                </script>
            </Helmet>

            <div className={styles.pageWrapper}>
                <div className={styles.blogContainer}>
                    <button
                        onClick={() => navigate("/bloglist")}
                        className={styles.backButton}
                        data-testid="back-to-blogs-button"
                    >
                        <FaArrowLeft /> Back to Blogs
                    </button>

                    <div className={styles.blogHeader}>
                        <div className={styles.categoryTags}>
                            {blog.categories?.map((cat: any, idx: number) => (
                                <span key={idx} className={styles.categoryTag}>
                                    {cat.title}
                                </span>
                            ))}
                        </div>
                        <h1 className={styles.blogTitle} data-testid="blog-title">{blog.title}</h1>

                        <div className={styles.blogMeta}>
                            <div className={styles.authorInfo}>
                                {blog.author?.image?.asset?.url && (
                                    <img
                                        src={blog.author.image.asset.url}
                                        alt={blog.author.name}
                                        className={styles.authorImage}
                                    />
                                )}
                                <div>
                                    <p className={styles.authorName}>{blog.author?.name}</p>
                                    <p className={styles.publishDate}>
                                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })} · {readingTime} min read
                                    </p>
                                </div>
                            </div>

                            <div className={styles.socialShare}>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.shareIcon}
                                    aria-label="Share on Facebook"
                                >
                                    <FaFacebook size={20} />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.shareIcon}
                                    aria-label="Share on Twitter"
                                >
                                    <RiTwitterXFill size={20} />
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.shareIcon}
                                    aria-label="Share on LinkedIn"
                                >
                                    <FaLinkedin size={20} />
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + " " + shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.shareIcon}
                                    aria-label="Share on WhatsApp"
                                >
                                    <FaWhatsapp size={20} />
                                </a>
                                <button
                                    onClick={shareBlog}
                                    className={styles.shareIcon}
                                    aria-label="Share"
                                >
                                    <IoShareOutline size={20} />
                                </button>
                                <button
                                    onClick={copyLinkWithPreview}
                                    className={styles.shareIcon}
                                    aria-label="Copy link with preview"
                                    title="Copy link with preview image"
                                >
                                    {copiedLink ? <FiCheck /> : <FiCopy />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {blog.mainImage && (
                        <div className={styles.featuredImageWrapper}>
                            <img
                                src={blog.mainImage.asset.url}
                                alt={blog.mainImage.alt || blog.title}
                                className={styles.featuredImage}
                            />
                        </div>
                    )}

                    <article className={styles.blogContent} data-testid="blog-content">
                        {renderContent(blog.body)}
                    </article>
                </div>
            </div>
        </>
    );
};

export default BlogPage;