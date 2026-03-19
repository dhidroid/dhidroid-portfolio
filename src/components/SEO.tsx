import React from 'react';
import { Helmet } from 'react-helmet';
import { PERSONAL_INFO } from '../config/personal';
import { SITE_STRUCTURED_DATA, PERSON_STRUCTURED_DATA } from '../utils/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  canonical?: string;
  type?: string;
  structuredData?: any;
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  section?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  canonical,
  structuredData,
  type = "website",
  publishedAt,
  modifiedAt,
  author,
  section,
  noindex = false
}) => {
  const siteTitle = PERSONAL_INFO.seo.defaultTitle;
  const siteUrl = PERSONAL_INFO.siteUrl;

  const finalTitle = title ? title : siteTitle;
  const finalDescription = description || PERSONAL_INFO.seo.defaultDescription;

  // Merge default keywords with page-specific ones
  const finalKeywords = keywords && keywords.length > 0
    ? [...new Set([...PERSONAL_INFO.seo.defaultKeywords, ...keywords])].join(", ")
    : PERSONAL_INFO.seo.defaultKeywords.join(", ");

  // Resolve Image (ensure absolute URL)
  let finalImage = image || PERSONAL_INFO.seo.defaultImage;
  if (!finalImage.startsWith('http')) {
    finalImage = `${siteUrl}${finalImage.startsWith('/') ? '' : '/'}${finalImage}`;
  }

  // Resolve URL
  const effectiveUrl = url || canonical;
  const finalUrl = effectiveUrl
    ? (effectiveUrl.startsWith('http') ? effectiveUrl : `${siteUrl}${effectiveUrl.startsWith('/') ? '' : '/'}${effectiveUrl}`)
    : siteUrl;

  // Determine if we should show sitelinks (only on homepage and about)
  const showSiteLinks = finalUrl === siteUrl || finalUrl === `${siteUrl}/about`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author || PERSONAL_INFO.name} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="Dhidroid" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:updated_time" content={modifiedAt || new Date().toISOString()} />
      
      {/* Article specific Open Graph */}
      {type === 'article' && publishedAt && (
        <>
          <meta property="article:published_time" content={publishedAt} />
          <meta property="article:modified_time" content={modifiedAt || publishedAt} />
          <meta property="article:author" content={author || PERSONAL_INFO.name} />
          {section && <meta property="article:section" content={section} />}
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dhidroid" />
      <meta name="twitter:creator" content="@dhidroid" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={finalTitle} />
      
      {/* Additional SEO Meta */}
      <meta name="theme-color" content="#000000" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Dhidroid" />
      
      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          ...structuredData,
          ...(showSiteLinks && { 
            hasPart: SITE_STRUCTURED_DATA.hasPart,
            potentialAction: SITE_STRUCTURED_DATA.potentialAction
          })
        })}
      </script>
      
      {/* Person Schema - always include for author recognition */}
      {(type === 'article' || showSiteLinks) && (
        <script type="application/ld+json">
          {JSON.stringify(PERSON_STRUCTURED_DATA)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
