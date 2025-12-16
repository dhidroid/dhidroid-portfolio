import { resolveRouteImage, OG_MAP, resolveImageUrl } from './meta';
import aboutData from './Data/aboutData.json';

const SITE_BASE = (import.meta.env?.VITE_SITE_URL as string) || 'https://dhidroid.vercel.app';
const SITE_NAME = 'Dhidroid';

export type MetaResult = {
  title: string;
  description: string;
  keywords?: string[];
  image: { url: string; type: string };
  canonical: string;
  structuredData?: any;
};

/**
 * Generate meta for generic routes or items. Prefers item image; otherwise uses route mapping.
 */
export function generateMetaForRoute(route: string, opts?: { title?: string; description?: string; keywords?: string[]; image?: string | null; itemUrl?: string }): MetaResult {
  const path = route || '/';
  const title = opts?.title || defaultTitleForRoute(path);
  const description = opts?.description || defaultDescriptionForRoute(path);
  const keywords = opts?.keywords || defaultKeywordsForRoute(path);

  const image = resolveRouteImage(path, SITE_BASE, opts?.image);
  const canonical = opts?.itemUrl ? (opts.itemUrl.startsWith('http') ? opts.itemUrl : `${SITE_BASE.replace(/\/$/, '')}${opts.itemUrl.startsWith('/') ? '' : '/'}${opts.itemUrl}`) : `${SITE_BASE.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;

  const structuredData = generateStructuredData(path, { title, description, canonical, image: image.url });

  return { title, description, keywords, image, canonical, structuredData };
}

function defaultTitleForRoute(route: string) {
  switch (route) {
    case '/': return `${SITE_NAME} - DhineshKumar Thirupathi | Web & Mobile Developer`;
    case '/projects': return `Projects | ${SITE_NAME}`;
    case '/bloglist': return `Blog | ${SITE_NAME}`;
    case '/skills': return `Skills | ${SITE_NAME}`;
    case '/about': return `About | ${SITE_NAME}`;
    case '/links': return `Links | ${SITE_NAME}`;
    default: return `${SITE_NAME}`;
  }
}

function defaultDescriptionForRoute(route: string) {
  switch (route) {
    case '/': return "DhineshKumar Thirupathi - Full Stack Developer specializing in React, React Native, Node.js and Cloud services.";
    case '/projects': return "Explore selected projects in web and mobile development by DhineshKumar (Dhidroid).";
    case '/bloglist': return "Latest articles and tutorials on web development, React Native, and engineering best practices.";
    case '/skills': return "Skills & Technologies: React Native, React, Node.js, TypeScript, Firebase, and more.";
    case '/about': return aboutData.about.slice(0, 160);
    case '/links': return "Collection of external links and profiles for DhineshKumar (Dhidroid).";
    default: return "Explore Dhidroid - Web & Mobile developer portfolio, blog and projects.";
  }
}

function defaultKeywordsForRoute(route: string) {
  const base = ['Dhidroid', 'DhineshKumar Thirupathi', 'Web Developer', 'Mobile Developer'];
  switch (route) {
    case '/projects': return [...base, 'Projects', 'Portfolio'];
    case '/bloglist': return [...base, 'Blog', 'Articles', 'Tutorials'];
    case '/skills': return [...base, 'Skills', 'Tech Stack'];
    default: return base;
  }
}

function generateStructuredData(route: string, opts: { title: string; description: string; canonical: string; image: string }) {
  // Basic WebPage schema; for lists or home page
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': opts.title,
    'description': opts.description,
    'url': opts.canonical,
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_BASE.replace(/\/$/, '')}/logo.svg`
      }
    },
    'image': opts.image
  };
}

export default { generateMetaForRoute };
