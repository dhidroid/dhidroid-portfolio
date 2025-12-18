import {
  Code,
  Database,
  Server,
  Monitor,
  Tag,
  BookOpen,
  Camera,
  ShoppingCart,
  Heart,
  Zap,
  Cpu,
  GitBranch,
  Shield,
  Box,
  Layers,
  Users,
} from 'lucide-react';

// Return a lucide-react icon component based on a category string
export const getIconForCategory = (title?: string) => {
  if (!title) return Tag;
  const t = title.toLowerCase();

  if (t.includes('api') || t.includes('backend') || t.includes('database')) return Database;
  if (t.includes('server') || t.includes('devops') || t.includes('infra') || t.includes('ops')) return Server;
  if (t.includes('frontend') || t.includes('ui') || t.includes('design')) return Monitor;
  if (t.includes('security') || t.includes('auth') || t.includes('oauth') || t.includes('shield')) return Shield;
  if (t.includes('performance') || t.includes('optimization') || t.includes('perf')) return Zap;
  if (t.includes('testing') || t.includes('qa') || t.includes('ci')) return Code;
  if (t.includes('architecture') || t.includes('system')) return Layers;
  if (t.includes('data') || t.includes('ml') || t.includes('ai')) return Cpu;
  if (t.includes('dev') || t.includes('engineering') || t.includes('code')) return Code;
  if (t.includes('security') || t.includes('auth')) return Shield;
  if (t.includes('guides') || t.includes('docs') || t.includes('documentation')) return BookOpen;
  if (t.includes('media') || t.includes('image') || t.includes('photo')) return Camera;
  if (t.includes('ecom') || t.includes('store') || t.includes('shopping')) return ShoppingCart;
  if (t.includes('community') || t.includes('team') || t.includes('people')) return Users;
  if (t.includes('product') || t.includes('release') || t.includes('platform')) return Box;
  if (t.includes('ops') || t.includes('infra')) return Server;
  if (t.includes('git') || t.includes('version')) return GitBranch;
  if (t.includes('design') || t.includes('ux')) return Monitor;
  if (t.includes('health') || t.includes('sre')) return Heart;

  // Fallbacks
  if (t.length <= 4) return Tag;
  return Tag;
};
