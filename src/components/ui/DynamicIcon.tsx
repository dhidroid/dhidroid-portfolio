import React from 'react';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import { Terminal } from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className }) => {
  // Normalize the name: lowercase, remove special chars
  const normalizedKey = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Manual Mapping for common cases (improves accuracy)
  const iconMap: Record<string, React.ElementType> = {
    'react': SiIcons.SiReact,
    'reactnative': SiIcons.SiReact,
    'reactjs': SiIcons.SiReact,
    'html5': SiIcons.SiHtml5,
    'css3': SiIcons.SiCss3,
    'nextjs': SiIcons.SiNextdotjs,
    'next': SiIcons.SiNextdotjs,
    'node': SiIcons.SiNodedotjs,
    'nodejs': SiIcons.SiNodedotjs,
    'typescript': SiIcons.SiTypescript,
    'ts': SiIcons.SiTypescript,
    'javascript': SiIcons.SiJavascript,
    'js': SiIcons.SiJavascript,
    'tailwind': SiIcons.SiTailwindcss,
    'tailwindcss': SiIcons.SiTailwindcss,
    'sanity': SiIcons.SiSanity,
    'sanityio': SiIcons.SiSanity,
    'framer': SiIcons.SiFramer,
    'framermotion': SiIcons.SiFramer,
    'vite': SiIcons.SiVite,
    'firebase': SiIcons.SiFirebase,
    'supabase': SiIcons.SiSupabase,
    'mongodb': SiIcons.SiMongodb,
    'postgresql': SiIcons.SiPostgresql,
    'mysql': SiIcons.SiMysql,
    'graphql': SiIcons.SiGraphql,
    'apollo': SiIcons.SiApollographql,
    'redux': SiIcons.SiRedux,
    'docker': SiIcons.SiDocker,
    'kubernetes': SiIcons.SiKubernetes,
    'aws': SiIcons.SiAmazonwebservices,
    'googlecloud': SiIcons.SiGooglecloud,
    'vercel': SiIcons.SiVercel,
    'github': SiIcons.SiGithub,
    'git': SiIcons.SiGit,
    'figma': SiIcons.SiFigma,
    'adobeXd': SiIcons.SiAdobexd,
    'photoshop': SiIcons.SiAdobephotoshop,
    'illustrator': SiIcons.SiAdobeillustrator,
    'python': SiIcons.SiPython,
    'django': SiIcons.SiDjango,
    'flask': SiIcons.SiFlask,
    'flutter': SiIcons.SiFlutter,
    'dart': SiIcons.SiDart,
    'android': SiIcons.SiAndroid,
    'ios': SiIcons.SiApple,
    'swift': SiIcons.SiSwift,
    'kotlin': SiIcons.SiKotlin,
    'java': FaIcons.FaJava,
    'csharp': SiIcons.SiSharp,
    'cpp': SiIcons.SiCplusplus,
    'go': SiIcons.SiGo,
    'golang': SiIcons.SiGo,
    'rust': SiIcons.SiRust,
    'php': SiIcons.SiPhp,
    'laravel': SiIcons.SiLaravel,
    'wordpress': SiIcons.SiWordpress,
    'webflow': SiIcons.SiWebflow,
    'shopify': SiIcons.SiShopify,
    'uiux': FaIcons.FaLayerGroup,
    'design': FaIcons.FaPaintBrush,
    'development': FaIcons.FaCode,
    'web': FaIcons.FaGlobe,
    'netlify': SiIcons.SiNetlify,
    'jest': SiIcons.SiJest,
    'coderabbits': SiIcons.SiRabbitmq,
  };

  // 2. Direct Lookup
  if (iconMap[normalizedKey]) {
    const Icon = iconMap[normalizedKey];
    return <Icon className={className} />;
  }

  // 3. Fallback to SimpleIcons dynamic search (e.g. "Si" + Capitalized)
  // This is risky without capitalisation logic, stick to manual map + generic fallback for now.
  
  return <Terminal className={className} />;
};
