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
  const base = "Dhidroid";
  switch (route) {
    case '/': return `${PERSONAL_INFO.seo.defaultTitle}`;
    case '/works':
    case '/project': return `Portfolio & Case Studies | ${base} - Senior Full Stack Developer`;
    case '/bloglist': return `Tech Blog & Insights | ${base} - Full Stack Development & AI`;
    case '/skills': return `Expertise & Tech Stack | ${base} - Expertise in React, Node, React Native`;
    case '/about': return `About Dhidroid | Dhineshkumar Thirupathi - 100+ Years Exp Dev Journey`; // User specifically asked for "100+ year exp dev" vibe
    case '/services': return `Freelance Development Services | ${base} - Web, Mobile & AI Solutions`;
    case '/schedule': return `Book a Call | ${base} - Hire a Senior Developer for Your Project`;
    default: return `${PERSONAL_INFO.seo.defaultTitle}`;
  }
}

function defaultDescriptionForRoute(route: string) {
  switch (route) {
    case '/': return PERSONAL_INFO.seo.defaultDescription;
    case '/works':
    case '/project': return "Explore a curated gallery of high-performance digital products, mobile apps, and full-stack web solutions. From concept to deployment, witness technical excellence.";
    case '/bloglist': return "Deep dives into modern engineering: React patterns, React Native performance, AI integration, and full-stack architecture tutorials.";
    case '/skills': return "A comprehensive overview of my technical arsenal: React Native for cross-platform apps, MERN stack for scalable web, and AI/ML for next-gen features.";
    case '/about': return `Discover the engineering philosophy of Dhineshkumar Thirupathi. Building digital ecosystems with senior-level precision, scalability, and user-centric design.`;
    case '/services': return "Elevate your business with bespoke development: High-concurrency web apps, premium mobile experiences, and AI-driven automation services.";
    default: return PERSONAL_INFO.seo.defaultDescription;
  }
}

function defaultKeywordsForRoute(route: string) {
  const base = PERSONAL_INFO.seo.defaultKeywords;
  switch (route) {
    case '/works':
    case '/project': return [...base, 'Portfolio', 'Case Studies', 'Software Engineering Projects', 'Mobile App Development Portfolio', 'Web Development Showcase'];
    case '/bloglist': return [...base, 'Technical Writing', 'Coding Tutorials', 'Development Insights', 'AI/ML Engineering', 'Software Architecture Blog'];
    case '/skills': return [...base, 'Expert Developer', 'Technical Leader', 'Cloud Computing', 'System Design', 'Performance Optimization'];
    case '/about': return [...base, 'Senior Developer Profile', 'Engineering Leadership', 'Hire Expert Developer', 'Tamil Nadu Developer'];
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
