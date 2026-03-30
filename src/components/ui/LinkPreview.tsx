import React, { createContext, useContext, useState, useCallback } from 'react';

interface LinkPreviewData {
  title: string;
  description: string;
  icon?: React.ReactNode;
  preview?: string;
}

interface LinkPreviewContextType {
  registerPreview: (url: string, data: LinkPreviewData) => void;
  getPreview: (url: string) => LinkPreviewData | null;
  hoveredLink: string | null;
  setHoveredLink: (url: string | null) => void;
  linkPosition: DOMRect | null;
  setLinkPosition: (rect: DOMRect | null) => void;
}

const LinkPreviewContext = createContext<LinkPreviewContextType | null>(null);

export const useLinkPreview = () => {
  const context = useContext(LinkPreviewContext);
  if (!context) {
    throw new Error('useLinkPreview must be used within LinkPreviewProvider');
  }
  return context;
};

const PAGE_METADATA: Record<string, LinkPreviewData> = {
  '/': {
    title: 'Home',
    description: 'Welcome to my portfolio - Full-stack developer & creative technologist',
    preview: 'hero'
  },
  '/about': {
    title: 'About Me',
    description: 'Learn about my journey, experience, and passion for building products',
    preview: 'about'
  },
  '/works': {
    title: 'My Works',
    description: 'Explore my projects ranging from mobile apps to web platforms',
    preview: 'works'
  },
  '/skills': {
    title: 'Skills & Stack',
    description: 'My technical toolkit: React, Node.js, Cloud Architecture, and more',
    preview: 'skills'
  },
  '/services': {
    title: 'Services',
    description: 'Development services: Mobile apps, Web platforms, UI/UX, and more',
    preview: 'services'
  },
  '/contact': {
    title: 'Contact',
    description: "Let's connect! Available for freelance and collaboration",
    preview: 'contact'
  },
  '/bloglist': {
    title: 'Blog',
    description: 'Technical articles, tutorials, and insights on development',
    preview: 'blog'
  },
  '/schedule': {
    title: 'Book a Call',
    description: 'Schedule a consultation or discovery call',
    preview: 'schedule'
  },
};

const EXTERNAL_METADATA: Record<string, LinkPreviewData> = {
  'react.dev': { title: 'React', description: 'The library for web and native user interfaces' },
  'nextjs.org': { title: 'Next.js', description: 'The React Framework for the Web' },
  'typescriptlang.org': { title: 'TypeScript', description: 'JavaScript with syntax for types' },
  'tailwindcss.com': { title: 'Tailwind CSS', description: 'A utility-first CSS framework' },
  'framer.com': { title: 'Framer Motion', description: 'Production-ready motion library' },
  'vitejs.dev': { title: 'Vite', description: 'Next generation frontend tooling' },
  'redux.js.org': { title: 'Redux', description: 'Predictable state container' },
  'nodejs.org': { title: 'Node.js', description: 'JavaScript runtime built on Chrome V8' },
  'go.dev': { title: 'Go', description: 'Simple, reliable, and efficient software' },
  'python.org': { title: 'Python', description: 'Programming language that lets you work quickly' },
  'postgresql.org': { title: 'PostgreSQL', description: 'Advanced open source database' },
  'mongodb.com': { title: 'MongoDB', description: 'Document database for modern applications' },
  'graphql.org': { title: 'GraphQL', description: 'Query language for APIs' },
  'firebase.google.com': { title: 'Firebase', description: 'Platform to develop and grow apps' },
  'supabase.com': { title: 'Supabase', description: 'Open source Firebase alternative' },
  'reactnative.dev': { title: 'React Native', description: 'Framework for building native apps' },
  'flutter.dev': { title: 'Flutter', description: "Google's UI toolkit for cross-platform" },
  'docker.com': { title: 'Docker', description: 'Platform to build and share containers' },
  'git-scm.com': { title: 'Git', description: 'Distributed version control' },
  'figma.com': { title: 'Figma', description: 'Collaborative interface design tool' },
  'aws.amazon.com': { title: 'AWS', description: 'Cloud computing services' },
  'vercel.com': { title: 'Vercel', description: 'Develop, preview, and ship' },
  'netlify.com': { title: 'Netlify', description: 'Deploy modern web projects' },
  'jestjs.io': { title: 'Jest', description: 'Delightful JavaScript testing' },
};

export const LinkPreviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registeredPreviews, setRegisteredPreviews] = useState<Record<string, LinkPreviewData>>({});
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [linkPosition, setLinkPosition] = useState<DOMRect | null>(null);

  const registerPreview = useCallback((url: string, data: LinkPreviewData) => {
    setRegisteredPreviews(prev => ({ ...prev, [url]: data }));
  }, []);

  const getPreview = useCallback((url: string): LinkPreviewData | null => {
    if (registeredPreviews[url]) {
      return registeredPreviews[url];
    }
    
    if (url.startsWith('/')) {
      return PAGE_METADATA[url] || null;
    }
    
    if (url.startsWith('http')) {
      try {
        const hostname = new URL(url).hostname.replace('www.', '');
        return EXTERNAL_METADATA[hostname] || {
          title: hostname,
          description: `Visit ${hostname}`,
        };
      } catch {
        return null;
      }
    }
    
    return null;
  }, [registeredPreviews]);

  return (
    <LinkPreviewContext.Provider value={{
      registerPreview,
      getPreview,
      hoveredLink,
      setHoveredLink,
      linkPosition,
      setLinkPosition,
    }}>
      {children}
    </LinkPreviewContext.Provider>
  );
};

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  externalIcon?: boolean;
  showPreview?: boolean;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  href,
  children,
  className = '',
  externalIcon = true,
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('//');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
      {isExternal && externalIcon && (
        <svg
          className="inline-block ml-1 w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  );
};

interface LinkPreviewPopupProps {
  preview: LinkPreviewData;
  isExternal: boolean;
}

const LinkPreviewPopup: React.FC<LinkPreviewPopupProps> = ({ preview, isExternal }) => {
  const { linkPosition, setHoveredLink, setLinkPosition } = useLinkPreview();
  
  if (!linkPosition) return null;

  const offset = 12;
  const popupWidth = 360;
  
  let left = linkPosition.left + linkPosition.width / 2 - popupWidth / 2;
  const top = linkPosition.top - offset;
  
  if (left < 16) left = 16;
  if (left + popupWidth > globalThis.innerWidth - 16) {
    left = globalThis.innerWidth - popupWidth - 16;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[9998]"
        onMouseEnter={() => setHoveredLink(linkPosition ? window.location.href : null)}
        onMouseLeave={() => {
          setHoveredLink(null);
          setLinkPosition(null);
        }}
      />
      <div
        className="fixed z-[9999] w-[360px] bg-white border border-border/60 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{
          left: `${left}px`,
          top: `${top}px`,
        }}
      >
        {/* Pricing Page Typography Style Header */}
        <div className="h-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-center justify-center border-b border-border/40 relative">
          <div className="text-5xl font-display font-bold text-primary/30 uppercase tracking-tighter">
            {preview.title.charAt(0)}
          </div>
          {isExternal && (
            <div className="absolute top-3 right-3 bg-gray-100/80 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-gray-500">
              External
            </div>
          )}
        </div>
        
        <div className="p-6">
          {/* Title with Pricing Typography Style */}
          <div className="mb-4">
            <h4 className="font-display font-bold text-xl text-foreground tracking-tight">{preview.title}</h4>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1 block">
              {isExternal ? 'External Link' : 'Internal Page'}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed font-sans line-clamp-3">
            {preview.description}
          </p>
          
          {/* Action indicator */}
          {isExternal && (
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Opens in new tab</span>
            </div>
          )}
        </div>
        
        {/* Arrow pointing down - Pricing style */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-border/40 rotate-45" />
      </div>
    </>
  );
};

export default LinkPreview;
