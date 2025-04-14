import { GoDotFill } from "react-icons/go";
import ProjectCard from "../../components/Cards/ProjectsCard";
import React, { useEffect, useState } from "react";
import { client } from "../../senity/senity";
import styles from "./Styles/index.module.css";
import { Helmet } from 'react-helmet'
import Loader from "../../components/loader/Loader";

const Projects = () => {
  const [ProjectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    client
      .fetch(`*[_type == "project"] {
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
        link
      }`)
      .then((data) => {
        setProjectData(data);
      })
      .catch(console.error).finally(() => { setLoading(false) });
  }, []);


  const metaDescription = ProjectData.length > 0
    ? ProjectData.map((data) => data.description).slice(0, 2).join(" | ")
    : "Explore our latest projects showcasing innovation and creativity.";

  const dynamicKeywords = ProjectData.length > 0
    ? [...new Set(ProjectData.flatMap((data) => data.categories?.map(({ title }) => title) || []))].join(", ")
    : "Projects, App Development, React, React Native, Firebase, Web Development";

  const ogImage = ProjectData.length > 0 ? ProjectData[0]?.image?.asset?.url : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Projects",
    "description": metaDescription,
    "itemListElement": ProjectData.map((data, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": data?.title,
      "description": data?.description,
      "url": data?.link || "https://dhidroid.vercel.app/projects",
      "image": data?.image?.asset?.url || ""
    }))
  };


  if (loading) {
    return <Loader />
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>dhidroid - projects</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={dynamicKeywords} />
        <meta name="author" content="dhidroid | dhineshkumar thirupathi" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="Projects - dhidroid" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content="https://dhidroid.vercel.app/projects" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects - dhidroid" />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@YourTwitterHandle" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.header}>
          <h1>Projects</h1>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div>
            {ProjectData?.map((data, index) => (
              <div key={index} className={styles.cardWrapper}>
                <ProjectCard
                  projectDes={data?.description}
                  projectImage={data?.image?.asset?.url}
                  projectTitle={data?.title}
                  catagrees={data.categories?.map(({ title }) => title) || []}
                  link={data?.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Projects;
