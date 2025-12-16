import React from 'react';
import { Helmet } from 'react-helmet';
import { resolveImageUrl, resolveRouteImage } from '../utils/meta';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  route?: string;
  url?: string;
  structuredData?: any;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, route, url, structuredData }) => {
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
  const siteUrl = "https://dhidroid.vercel.app"; // canonical site base URL
  const defaultImagePath = '/logo.svg';

  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords ? [...defaultKeywords, ...keywords] : defaultKeywords;
  // If a route is provided and no explicit image prop is given, resolve by route mapping
  const resolved = image && image !== '' ? resolveImageUrl(image, siteUrl, defaultImagePath) : resolveRouteImage(route, siteUrl);
  const { url: finalImage, type: finalImageType } = resolved;
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
      <meta property="og:image:type" content={finalImageType} />
      <meta property="og:image:alt" content={title || siteTitle} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      <meta property="twitter:image:alt" content={title || siteTitle} />
      
      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />
      {/* JSON-LD structured data (if provided) */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
