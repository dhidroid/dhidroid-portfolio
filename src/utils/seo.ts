import { PERSONAL_INFO } from '../config/personal';

const SITE_BASE = PERSONAL_INFO.siteUrl;
const SITE_NAME = "Dhidroid";

export type MetaResult = {
  title: string;
  description: string;
  keywords?: string[];
  image: string;
  canonical: string;
  type: string;
  structuredData?: any;
};

/**
 * Generate meta for generic routes or items.
 */
export function generateMetaForRoute(route: string, opts?: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string | null;
  itemUrl?: string;
  type?: string;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
}): MetaResult {
  const path = route || '/';

  // 1. Resolve basic meta
  const title = opts?.title
    ? `${opts.title} | ${SITE_NAME}`
    : defaultTitleForRoute(path);

  const description = opts?.description || defaultDescriptionForRoute(path);

  const keywords = [
    ...(opts?.keywords || []),
    ...defaultKeywordsForRoute(path)
  ];

  // 2. Resolve Image
  // If opts.image is provided and absolute, use it. If relative, prepend site base.
  // Fallback to default personal image.
  let image = PERSONAL_INFO.seo.defaultImage;
  if (opts?.image) {
    if (opts.image.startsWith('http')) {
      image = opts.image;
    } else {
      image = `${SITE_BASE}${opts.image.startsWith('/') ? '' : '/'}${opts.image}`;
    }
  } else {
    // If no image provided, use default but ensure it's absolute
    image = `${SITE_BASE}${PERSONAL_INFO.seo.defaultImage}`;
  }

  // 3. Resolve Canonical
  const canonical = opts?.itemUrl
    ? (opts.itemUrl.startsWith('http') ? opts.itemUrl : `${SITE_BASE}${opts.itemUrl.startsWith('/') ? '' : '/'}${opts.itemUrl}`)
    : `${SITE_BASE}${path.startsWith('/') ? path : '/' + path}`;

  const type = opts?.type || 'website';

  // 4. Generate Structured Data
  const structuredData = generateStructuredData({
    title,
    description,
    canonical,
    image,
    type,
    publishedAt: opts?.publishedAt,
    updatedAt: opts?.updatedAt,
    authorName: opts?.authorName
  });

  return { title, description, keywords, image, canonical, type, structuredData };
}

function defaultTitleForRoute(route: string) {
  switch (route) {
    case '/': return PERSONAL_INFO.seo.defaultTitle;
    case '/works': return `Projects | ${PERSONAL_INFO.name}`;
    case '/bloglist': return `Blog | ${PERSONAL_INFO.name}`;
    case '/skills': return `Skills & Stack | ${PERSONAL_INFO.name}`;
    case '/about': return `About | ${PERSONAL_INFO.name}`;
    case '/services': return `Services | ${PERSONAL_INFO.name}`;
    default: return PERSONAL_INFO.seo.defaultTitle;
  }
}

function defaultDescriptionForRoute(route: string) {
  switch (route) {
    case '/': return PERSONAL_INFO.seo.defaultDescription;
    case '/works': return "Explore selected projects and case studies in web and mobile development.";
    case '/bloglist': return "Technical articles, tutorials, and insights on Full Stack Development.";
    case '/skills': return "My technical toolkit: React, Node.js, Cloud Architecture, and Design Systems.";
    case '/about': return `Learn more about ${PERSONAL_INFO.name}, a ${PERSONAL_INFO.role} passionate about building scalable digital products.`;
    default: return PERSONAL_INFO.seo.defaultDescription;
  }
}

function defaultKeywordsForRoute(route: string) {
  const base = PERSONAL_INFO.seo.defaultKeywords;
  switch (route) {
    case '/works': return [...base, 'Projects', 'Case Studies', 'Portfolio Works'];
    case '/bloglist': return [...base, 'Blog', 'Tech Tutorials', 'Engineering'];
    case '/skills': return [...base, 'Skills', 'Tech Stack', 'React', 'Node.js'];
    default: return base;
  }
}

function generateStructuredData(opts: {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: string;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
}) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': opts.type === 'article' ? 'BlogPosting' : 'WebPage',
    'name': opts.title,
    'description': opts.description,
    'url': opts.canonical,
    'image': opts.image,
    'publisher': {
      '@type': 'Organization',
      'name': PERSONAL_INFO.name,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_BASE}/logo.svg`
      }
    }
  };

  if (opts.type === 'article') {
    return {
      ...baseSchema,
      'headline': opts.title,
      'datePublished': opts.publishedAt,
      'dateModified': opts.updatedAt || opts.publishedAt,
      'author': {
        '@type': 'Person',
        'name': opts.authorName || PERSONAL_INFO.name,
        'url': PERSONAL_INFO.siteUrl
        },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': opts.canonical
      }
    };
  }

  // Person Schema for Home/About
  if (opts.canonical === SITE_BASE || opts.canonical === `${SITE_BASE}/about`) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': PERSONAL_INFO.name,
      'url': PERSONAL_INFO.siteUrl,
      'image': `${SITE_BASE}/profile.jpg`, // Assuming profile image exists or logo
      'sameAs': [
        PERSONAL_INFO.social.linkedin,
        PERSONAL_INFO.social.github,
        PERSONAL_INFO.social.twitter,
        PERSONAL_INFO.social.instagram,
        PERSONAL_INFO.social.peerlist
      ],
      'jobTitle': PERSONAL_INFO.role,
      'worksFor': {
        '@type': 'Organization',
        'name': 'Freelance / Self-Employed'
      }
    };
  }

  return baseSchema;
}

export default { generateMetaForRoute };
