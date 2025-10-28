import { GoDotFill } from "react-icons/go";
import ProjectCard from "../../components/Cards/ProjectsCard";
import React, { useEffect, useState } from "react";
import { client } from "../../senity/senity";
import styles from "./Styles/index.module.css";
import { Helmet } from 'react-helmet';
import Loader from "../../components/loader/Loader";

const Projects = () => {
  const [ProjectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    client
      .fetch(`*[_type == "project"] | order(_createdAt desc) {
        title,
        slug {
          current
        },
        description,
        image { 
          asset -> {
            _id,
            url
          },
          alt
        },
        categories[] -> { title },
        link,
        _createdAt,
        _updatedAt
      }`)
      .then((data) => {
        setProjectData(data);
      })
      .catch(console.error)
      .finally(() => { 
        setLoading(false); 
      });
  }, []);

  // SEO Configuration
  const pageTitle = "Projects | dhidroid - Portfolio of Web & Mobile App Development";
  const baseUrl = "https://dhidroid.vercel.app";
  const canonicalUrl = `${baseUrl}/projects`;
  
  const metaDescription = ProjectData.length > 0
    ? `Explore ${ProjectData.length} innovative projects by dhidroid including ${ProjectData.slice(0, 3).map(p => p.title).join(", ")}. Showcasing expertise in React, React Native, Firebase, and modern web development.`
    : "Discover innovative web and mobile app development projects by dhidroid. Expertise in React, React Native, Firebase, Node.js, and cutting-edge technologies.";

  const dynamicKeywords = ProjectData.length > 0
    ? [
        ...new Set(ProjectData.flatMap((data) => 
          data.categories?.map(({ title }) => title) || []
        )),
        "portfolio projects",
        "web development",
        "mobile app development",
        "dhidroid",
        "dhineshkumar thirupathi"
      ].join(", ")
    : "Projects, Portfolio, App Development, React, React Native, Firebase, Web Development, Mobile Apps, Full Stack Development, dhidroid, dhineshkumar thirupathi";

  const ogImage = ProjectData.length > 0 && ProjectData[0]?.image?.asset?.url 
    ? ProjectData[0].image.asset.url 
    : `${baseUrl}/default-og-image.jpg`; // Fallback image

  // Enhanced JSON-LD Schema with multiple schema types
  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "dhidroid Projects Portfolio",
    "description": metaDescription,
    "numberOfItems": ProjectData.length,
    "itemListElement": ProjectData.map((data, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": data?.title || "Untitled Project",
      "description": data?.description || "",
      "url": data?.link || canonicalUrl,
      "image": data?.image?.asset?.url || ogImage,
      "author": {
        "@type": "Person",
        "name": "Dhineshkumar Thirupathi",
        "alternateName": "dhidroid"
      },
      "keywords": data.categories?.map(({ title }) => title).join(", ") || "",
      "dateCreated": data?._createdAt,
      "dateModified": data?._updatedAt
    }))
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": canonicalUrl
      }
    ]
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "author": {
      "@type": "Person",
      "name": "Dhineshkumar Thirupathi",
      "alternateName": "dhidroid",
      "url": baseUrl
    },
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "dhidroid",
      "url": baseUrl
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={dynamicKeywords} />
        <meta name="author" content="dhidroid | dhineshkumar thirupathi" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Language and Region */}
        <html lang="en" />
        <meta httpEquiv="content-language" content="en-US" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="dhidroid" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="dhidroid Projects Portfolio" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dhidroid" />
        <meta name="twitter:creator" content="@dhidroid" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="dhidroid Projects Portfolio" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="dhidroid" />
        <meta name="apple-mobile-web-app-title" content="dhidroid" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Prevent duplicate content */}
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />

        {/* JSON-LD Structured Data - Multiple Schemas */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdItemList)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdBreadcrumb)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdWebPage)}
        </script>
      </Helmet>

      <div className={styles.container}>
        {/* Semantic HTML with proper heading hierarchy */}
        <header className={styles.header}>
          <h1>Projects</h1>
          {ProjectData.length > 0 && (
            <p className={styles.subtitle}>
              Showcasing {ProjectData.length} innovative projects in web and mobile development
            </p>
          )}
        </header>

        {/* Main Content with semantic HTML */}
        <main className={styles.content}>
          {ProjectData.length > 0 ? (
            <section aria-label="Projects list">
              {ProjectData.map((data, index) => (
                <article 
                  key={data?.slug?.current || index} 
                  className={styles.cardWrapper}
                  itemScope 
                  itemType="https://schema.org/CreativeWork"
                >
                  <ProjectCard
                    projectDes={data?.description}
                    projectImage={data?.image?.asset?.url}
                    projectTitle={data?.title}
                    catagrees={data.categories?.map(({ title }) => title) || []}
                    link={data?.link}
                  />
                </article>
              ))}
            </section>
          ) : (
            <section className={styles.emptyState}>
              <p>No projects available at the moment. Check back soon!</p>
            </section>
          )}
        </main>
      </div>
    </React.Fragment>
  );
};

export default Projects;