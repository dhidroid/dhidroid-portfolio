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

export interface ExperienceData {
  yearsOfExperience: string;
  projectsCompleted: string;
  clientsServed: string;
  technologies: string[];
  specializations: string[];
}

export const EXPERIENCE_DATA: ExperienceData = {
  yearsOfExperience: "1+",
  projectsCompleted: "50+",
  clientsServed: "30+",
  technologies: [
    "React", "React Native", "Next.js", "TypeScript", "Node.js", 
    "Python", "Go", "PostgreSQL", "MongoDB", "Firebase",
    "AWS", "Docker", "Git", "Figma"
  ],
  specializations: [
    "Mobile App Development",
    "Full Stack Web Development",
    "UI/UX Design",
    "AI/ML Integration",
    "Cloud Architecture",
    "Performance Optimization"
  ]
};

export const SITE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE_BASE,
  "description": PERSONAL_INFO.seo.defaultDescription,
  "author": {
    "@type": "Person",
    "name": PERSONAL_INFO.name,
    "alternateName": "Dhidroid",
    "jobTitle": "Full Stack Developer",
    "url": SITE_BASE,
    "sameAs": Object.values(PERSONAL_INFO.social)
  },
  "hasPart": [
    { "@type": "WebPage", "name": "Home", "url": `${SITE_BASE}/` },
    { "@type": "WebPage", "name": "About", "url": `${SITE_BASE}/about` },
    { "@type": "WebPage", "name": "Works", "url": `${SITE_BASE}/works` },
    { "@type": "WebPage", "name": "Skills", "url": `${SITE_BASE}/skills` },
    { "@type": "WebPage", "name": "Services", "url": `${SITE_BASE}/services` },
    { "@type": "WebPage", "name": "Blog", "url": `${SITE_BASE}/bloglist` },
    { "@type": "WebPage", "name": "Contact", "url": `${SITE_BASE}/contact` },
    { "@type": "WebPage", "name": "Pricing", "url": `${SITE_BASE}/pricing` },
    { "@type": "WebPage", "name": "Schedule", "url": `${SITE_BASE}/schedule` }
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_BASE}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const PERSON_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": PERSONAL_INFO.name,
  "alternateName": "Dhidroid",
  "description": `${PERSONAL_INFO.role} with ${EXPERIENCE_DATA.yearsOfExperience} years of experience. Completed ${EXPERIENCE_DATA.projectsCompleted} projects.`,
  "url": SITE_BASE,
  "image": `${SITE_BASE}/profile.jpg`,
  "jobTitle": PERSONAL_INFO.role,
  "email": PERSONAL_INFO.email,
  "telephone": "+91-9876543210",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dharmapuri",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "sameAs": Object.values(PERSONAL_INFO.social),
  "knowsAbout": EXPERIENCE_DATA.technologies,
  "hasOccupation": {
    "@type": "Occupation",
    "name": PERSONAL_INFO.role,
    "description": "Building digital products that scale",
    "skills": EXPERIENCE_DATA.specializations.join(", ")
  },
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "name": "Full Stack Development" },
    { "@type": "EducationalOccupationalCredential", "name": "Mobile App Development" }
  ]
};

export const ORGANIZATION_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": `${PERSONAL_INFO.name} - Freelance Developer`,
  "description": `Freelance ${PERSONAL_INFO.role} offering development services. ${EXPERIENCE_DATA.projectsCompleted} projects completed.`,
  "url": SITE_BASE,
  "telephone": "+91-9876543210",
  "email": PERSONAL_INFO.email,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dharmapuri",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "serviceType": EXPERIENCE_DATA.specializations,
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export const SERVICES_STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mobile App Development",
    "description": "Cross-platform mobile apps using React Native and Flutter",
    "provider": { "@type": "Person", "name": PERSONAL_INFO.name },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile Development Services",
      "itemListElement": [
        { "@type": "Offer", "name": "React Native App", "price": "999", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Flutter App", "price": "1299", "priceCurrency": "USD" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Development",
    "description": "Full-stack web applications using React, Next.js, Node.js",
    "provider": { "@type": "Person", "name": PERSONAL_INFO.name },
    "areaServed": "Worldwide"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "UI/UX Design",
    "description": "User interface and experience design using Figma",
    "provider": { "@type": "Person", "name": PERSONAL_INFO.name },
    "areaServed": "Worldwide"
  }
];

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
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  wordCount?: number;
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
  let image = PERSONAL_INFO.seo.defaultImage;
  if (opts?.image) {
    if (opts.image.startsWith('http')) {
      image = opts.image;
    } else {
      image = `${SITE_BASE}${opts.image.startsWith('/') ? '' : '/'}${opts.image}`;
    }
  } else {
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
    authorName: opts?.authorName,
    publishedTime: opts?.publishedTime,
    modifiedTime: opts?.modifiedTime,
    section: opts?.section,
    wordCount: opts?.wordCount
  });

  return { title, description, keywords, image, canonical, type, structuredData };
}

function defaultTitleForRoute(route: string) {
  const base = SITE_NAME;
  switch (route) {
    case '/': return `${PERSONAL_INFO.seo.defaultTitle}`;
    case '/works':
    case '/project': return `Portfolio & Case Studies | ${base} - ${EXPERIENCE_DATA.projectsCompleted} Projects Completed`;
    case '/bloglist': return `Tech Blog & Insights | ${base} - Full Stack Development & AI`;
    case '/skills': return `Expertise & Tech Stack | ${base} - ${EXPERIENCE_DATA.technologies.slice(0, 5).join(', ')}`;
    case '/about': return `About ${PERSONAL_INFO.name} | ${base} - ${EXPERIENCE_DATA.yearsOfExperience} Years of Experience`;
    case '/services': return `Freelance Development Services | ${base} - Web, Mobile & AI Solutions`;
    case '/pricing': return `Pricing | ${base} - Simple, Transparent Pricing`;
    case '/contact': return `Contact | ${base} - Let's Build Something Together`;
    case '/schedule': return `Book a Call | ${base} - Schedule a Consultation`;
    case '/changelog': return `Changelog | ${base} - Version History`;
    case '/licenses': return `Licenses | ${base} - Open Source Licenses`;
    case '/style-guide': return `Style Guide | ${base} - Design System`;
    default: return `${PERSONAL_INFO.seo.defaultTitle}`;
  }
}

function defaultDescriptionForRoute(route: string) {
  switch (route) {
    case '/': return `${PERSONAL_INFO.name} - ${PERSONAL_INFO.role}. ${EXPERIENCE_DATA.yearsOfExperience} years experience. ${EXPERIENCE_DATA.projectsCompleted} projects completed. Specializing in ${EXPERIENCE_DATA.specializations.slice(0, 3).join(', ')}.`;
    case '/works':
    case '/project': return `Explore ${EXPERIENCE_DATA.projectsCompleted} completed projects: Mobile apps, web platforms, and full-stack solutions. View case studies and technical implementation details.`;
    case '/bloglist': return `Technical articles on ${EXPERIENCE_DATA.technologies.slice(0, 3).join(', ')}. Tutorials, best practices, and insights on modern software development.`;
    case '/skills': return `Tech Stack: ${EXPERIENCE_DATA.technologies.join(', ')}. Expertise in ${EXPERIENCE_DATA.specializations.join(', ')}.`;
    case '/about': return `${PERSONAL_INFO.name} - ${PERSONAL_INFO.role} with ${EXPERIENCE_DATA.yearsOfExperience} years of experience. Completed ${EXPERIENCE_DATA.projectsCompleted} projects for ${EXPERIENCE_DATA.clientsServed} clients. Based in Tamil Nadu, India.`;
    case '/services': return `Development services: ${EXPERIENCE_DATA.specializations.join(', ')}. ${EXPERIENCE_DATA.projectsCompleted}+ projects completed. Available for freelance work.`;
    case '/pricing': return `Simple, transparent pricing for development services. Starting at $999 for web projects. Custom solutions for enterprise needs.`;
    case '/contact': return `Get in touch for your next project. Available for freelance, contract, and collaboration opportunities.`;
    case '/schedule': return `Book a free consultation call. Discuss your project requirements and get expert advice on your development needs.`;
    default: return PERSONAL_INFO.seo.defaultDescription;
  }
}

function defaultKeywordsForRoute(route: string) {
  const base = PERSONAL_INFO.seo.defaultKeywords;
  switch (route) {
    case '/': return [...base, ...EXPERIENCE_DATA.specializations, `${EXPERIENCE_DATA.yearsOfExperience} years experience`, `${EXPERIENCE_DATA.projectsCompleted} projects`];
    case '/works':
    case '/project': return [...base, 'Portfolio', 'Case Studies', 'Project Portfolio', 'Mobile App Development', 'Web Development', 'React Native Projects'];
    case '/bloglist': return [...base, 'Technical Blog', 'Tutorials', 'Development Articles', 'Coding Tips', 'Software Engineering'];
    case '/skills': return [...base, 'Tech Stack', 'Developer Skills', 'Programming Languages', 'Frameworks', ...EXPERIENCE_DATA.technologies];
    case '/about': return [...base, 'About Developer', 'Developer Profile', 'Software Engineer', 'Hire Developer', 'Tamil Nadu Developer'];
    case '/services': return [...base, 'Development Services', 'Freelance Developer', 'Contract Work', ...EXPERIENCE_DATA.specializations];
    case '/pricing': return [...base, 'Development Cost', 'Project Pricing', 'Developer Rates', 'Web Development Cost'];
    case '/contact': return [...base, 'Contact Developer', 'Hire Developer', 'Get Quote', 'Project Inquiry'];
    case '/schedule': return [...base, 'Book Call', 'Schedule Meeting', 'Free Consultation', 'Project Discussion'];
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
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  wordCount?: number;
}) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': opts.type === 'article' ? 'Article' : 'WebPage',
    'name': opts.title,
    'description': opts.description,
    'url': opts.canonical,
    'image': opts.image,
    'inLanguage': 'en-US',
    'isAccessibleForFree': true,
    'publisher': {
      '@type': 'Person',
      'name': opts.authorName || PERSONAL_INFO.name,
      'url': SITE_BASE,
      'image': `${SITE_BASE}/logo.svg`
    }
  };

  // Article/Blog Schema
  if (opts.type === 'article') {
    return {
      ...baseSchema,
      '@type': 'BlogPosting',
      'headline': opts.title,
      'datePublished': opts.publishedAt || opts.publishedTime,
      'dateModified': opts.updatedAt || opts.modifiedTime || opts.publishedAt,
      'author': {
        '@type': 'Person',
        'name': opts.authorName || PERSONAL_INFO.name,
        'url': SITE_BASE
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': opts.canonical
      },
      'articleSection': opts.section,
      'wordCount': opts.wordCount,
      'timeRequired': opts.wordCount ? `PT${Math.ceil(opts.wordCount / 200)}M` : undefined,
      'keywords': opts.description,
      'about': {
        '@type': 'Thing',
        'name': opts.section || 'Software Development'
      }
    };
  }

  // Person Schema for Home/About
  if (opts.canonical === SITE_BASE || opts.canonical === `${SITE_BASE}/about`) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': PERSONAL_INFO.name,
      'alternateName': 'Dhidroid',
      'url': SITE_BASE,
      'image': `${SITE_BASE}/profile.jpg`,
      'description': opts.description,
      'sameAs': Object.values(PERSONAL_INFO.social),
      'jobTitle': PERSONAL_INFO.role,
      'knowsAbout': EXPERIENCE_DATA.technologies,
      'hasOccupation': {
        '@type': 'Occupation',
        'name': PERSONAL_INFO.role,
        'description': EXPERIENCE_DATA.specializations.join(', ')
      }
    };
  }

  // WebPage Schema for other pages
  return {
    ...baseSchema,
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE_BASE },
        { '@type': 'ListItem', 'position': 2, 'name': opts.title, 'item': opts.canonical }
      ]
    }
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `${SITE_BASE}${item.url}`
    }))
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export default { generateMetaForRoute, generateBreadcrumbSchema, generateFAQSchema };
