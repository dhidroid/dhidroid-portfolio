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
  yearsOfExperience: "1.5+",
  projectsCompleted: "50+",
  clientsServed: "30+",
  technologies: [
    "React Native", "Go", "TypeScript", "Node.js", "React",
    "Python", "PostgreSQL", "MongoDB", "Firebase",
    "AWS", "Docker", "Sanity Studio CMS", "Git", "Figma"
  ],
  specializations: [
    "Mobile App Architecture & React Native",
    "Go Backend Microservices",
    "Full Stack Engineering",
    "Cloud Ecosystems & DevOps",
    "Sanity CMS & Content Engineering",
    "Performance & Memory Optimization"
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
    "jobTitle": "Senior Software Engineer & Mobile Specialist",
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
    { "@type": "WebPage", "name": "Blog Authors", "url": `${SITE_BASE}/blog/authors` },
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
    case '/project': return `Portfolio & Case Studies | ${base} - 1.5+ Years Experience (${EXPERIENCE_DATA.projectsCompleted} Projects)`;
    case '/bloglist': return `Engineering Blog & Technical Insights | ${base} - React Native, Go & Sanity CMS`;
    case '/authors':
    case '/blog/authors': return `Blog Authors & Editorial Team | ${base} - Sanity Studio Authors`;
    case '/skills': return `Expertise & Tech Stack | ${base} - 1.5+ Yrs Exp in ${EXPERIENCE_DATA.technologies.slice(0, 4).join(', ')}`;
    case '/about': return `The About Gazette & Biography | ${base} - 1.5+ Years Experience`;
    case '/services': return `Mobile & Full-Stack Development Services | ${base} - 1.5+ Yrs Exp`;
    case '/pricing': return `Pricing & Project Tiers | ${base} - Transparent Engineering Services`;
    case '/contact': return `Contact ${PERSONAL_INFO.name} | ${base} - Let's Build Something Great`;
    case '/schedule': return `Schedule Technical Consultation | ${base} - 1.5+ Yrs Engineering Expertise`;
    case '/changelog': return `Changelog | ${base} - System Version History`;
    case '/licenses': return `Licenses | ${base} - Open Source Software Licenses`;
    case '/style-guide': return `Style Guide | ${base} - Editorial Design System`;
    default: return `${PERSONAL_INFO.seo.defaultTitle}`;
  }
}

function defaultDescriptionForRoute(route: string) {
  switch (route) {
    case '/': return `${PERSONAL_INFO.name} - ${PERSONAL_INFO.role} with ${EXPERIENCE_DATA.yearsOfExperience} years of experience. ${EXPERIENCE_DATA.projectsCompleted} projects completed. Specializing in ${EXPERIENCE_DATA.specializations.slice(0, 3).join(', ')}.`;
    case '/works':
    case '/project': return `Explore ${EXPERIENCE_DATA.projectsCompleted} completed software projects backed by ${EXPERIENCE_DATA.yearsOfExperience} years of engineering experience: React Native mobile apps, Go microservices, and web platforms.`;
    case '/bloglist': return `Technical articles on React Native, Go, Cloud Ecosystems, and Sanity Studio CMS. Engineering insights backed by ${EXPERIENCE_DATA.yearsOfExperience} years of development experience.`;
    case '/authors':
    case '/blog/authors': return `Meet the writers, engineers, and contributors publishing technical articles and tutorials on the Dhidroid engineering blog directly from Sanity CMS.`;
    case '/skills': return `Technical Stack: ${EXPERIENCE_DATA.technologies.join(', ')}. Over ${EXPERIENCE_DATA.yearsOfExperience} years of hands-on expertise in ${EXPERIENCE_DATA.specializations.join(', ')}.`;
    case '/about': return `${PERSONAL_INFO.name} - ${PERSONAL_INFO.role} with ${EXPERIENCE_DATA.yearsOfExperience} years of experience building mobile applications and distributed backend architecture in Chennai, India.`;
    case '/services': return `Senior software engineering services backed by 1.5+ years experience: Mobile App Architecture, Go Backend Microservices, Full-Stack Web Development, and Sanity CMS Integration.`;
    case '/pricing': return `Transparent pricing for senior engineering and mobile architecture services with 1.5+ years of hands-on experience.`;
    case '/contact': return `Get in touch with Dhinesh Kumar (1.5+ years experience) for mobile app development, backend architecture, and technical consulting.`;
    case '/schedule': return `Book a technical consultation with Dhinesh Kumar. 1.5+ years experience in React Native, Go, and Cloud Architecture.`;
    default: return PERSONAL_INFO.seo.defaultDescription;
  }
}

function defaultKeywordsForRoute(route: string) {
  const base = PERSONAL_INFO.seo.defaultKeywords;
  switch (route) {
    case '/': return [...base, ...EXPERIENCE_DATA.specializations, `${EXPERIENCE_DATA.yearsOfExperience} years experience`, 'Senior Software Engineer'];
    case '/works':
    case '/project': return [...base, 'Portfolio', 'Case Studies', 'Project Portfolio', 'Mobile Architecture', 'React Native Apps', '1.5+ Years Exp'];
    case '/bloglist': return [...base, 'Technical Blog', 'Sanity CMS', 'React Native Tutorials', 'Go Microservices', 'Software Engineering Blog'];
    case '/authors':
    case '/blog/authors': return [...base, 'Blog Authors', 'Sanity Studio Authors', 'Editorial Board', 'Technical Writers', 'Engineering Team'];
    case '/skills': return [...base, 'Tech Stack', 'React Native', 'Go', 'TypeScript', 'Docker', '1.5+ Years Experience'];
    case '/about': return [...base, 'About Developer', 'Senior Software Engineer', 'Mobile Specialist', '1.5+ Years Experience', 'Chennai Engineer'];
    case '/services': return [...base, 'Senior Engineering Services', 'Mobile Architecture', 'Go Services', '1.5+ Years Exp'];
    case '/pricing': return [...base, 'Engineering Rates', 'Project Pricing', 'Consulting Fees', 'Software Architect Rates'];
    case '/contact': return [...base, 'Contact Engineer', 'Hire Senior Developer', '1.5+ Years Exp', 'Project Inquiry'];
    case '/schedule': return [...base, 'Book Call', 'Technical Consultation', '1.5+ Years Experience', 'Architecture Review'];
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
