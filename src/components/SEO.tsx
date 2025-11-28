import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url }) => {
  const siteTitle = "Dhidroid - Portfolio";
  const defaultDescription = "Dhinesh's Portfolio - Full Stack Developer, AI Enthusiast, and Tech Blogger. Explore my projects, skills, and latest articles.";
  const defaultKeywords = [
    "Dhinesh", 
    "Dhidroid", 
    "Portfolio", 
    "Full Stack Developer", 
    "AI Engineer", 
    "React Developer", 
    "Node.js", 
    "Sanity.io", 
    "Web Development",
    "Tech Blog"
  ];
  const defaultImage = "https://dhidroid.com/og-image.png"; // Placeholder, should be replaced with actual URL
  const siteUrl = "https://dhidroid.com";

  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords ? [...defaultKeywords, ...keywords] : defaultKeywords;
  const finalImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  const finalUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(", ")} />
      <meta name="author" content="Dhinesh" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />
    </Helmet>
  );
};

export default SEO;
