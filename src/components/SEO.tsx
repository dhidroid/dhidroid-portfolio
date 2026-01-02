import React from 'react';
import { Helmet } from 'react-helmet';
import { PERSONAL_INFO } from '../config/personal';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  structuredData,
  type = "website"
}) => {
  const siteTitle = PERSONAL_INFO.seo.defaultTitle;
  const siteUrl = PERSONAL_INFO.siteUrl;

  const finalTitle = title ? `${title} | Dhidroid` : siteTitle;
  const finalDescription = description || PERSONAL_INFO.seo.defaultDescription;

  // Merge default keywords with page-specific ones
  const finalKeywords = [
    ...PERSONAL_INFO.seo.defaultKeywords,
    ...(keywords || [])
  ].join(", ");

  // Resolve Image (ensure absolute URL)
  let finalImage = image || PERSONAL_INFO.seo.defaultImage;
  if (!finalImage.startsWith('http')) {
    finalImage = `${siteUrl}${finalImage.startsWith('/') ? '' : '/'}${finalImage}`;
  }

  // Resolve URL
  const finalUrl = url
    ? (url.startsWith('http') ? url : `${siteUrl}${url}`)
    : siteUrl;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={PERSONAL_INFO.name} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="Dhidroid" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:alt" content={finalTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dhidroid" />
      <meta name="twitter:creator" content="@dhidroid" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
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
