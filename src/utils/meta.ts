export function resolveImageUrl(image: string | undefined | null, siteBase: string, fallback = '/logo.svg') {
  const chosen = image && image !== '' ? image : fallback;

  // If already absolute, return as-is
  const url = chosen.startsWith('http') ? chosen : `${siteBase.replace(/\/$/, '')}${chosen.startsWith('/') ? '' : '/'}${chosen}`;

  // Infer MIME type from extension
  const ext = (chosen.split('.').pop() || '').toLowerCase();
  let type = 'image/png';
  if (ext === 'svg') type = 'image/svg+xml';
  else if (ext === 'jpg' || ext === 'jpeg') type = 'image/jpeg';
  else if (ext === 'webp') type = 'image/webp';
  else if (ext === 'gif') type = 'image/gif';

  return { url, type };
}

// prefer named exports to avoid duplicate identifier issues

// Route-based mapping: map SPA routes to public images you want used for social previews.
export const OG_MAP: Record<string, string> = {
  '/': '/images/og-default.svg',
  '/blog': '/images/og-blog.svg',
  '/bloglist': '/images/og-blog.svg',
  '/projects': '/images/og-projects.svg',
  '/project': '/images/og-projects.svg',
  '/about': '/images/og-about.svg',
  '/skills': '/images/og-skills.svg',
  '/links': '/images/og-links.svg',
};

export function resolveRouteImage(route: string | undefined, siteBase: string, pageImage?: string | null) {
  // Prefer page-specific image if provided
  if (pageImage && pageImage !== '') return resolveImageUrl(pageImage, siteBase);

  // Try exact match
  if (route && OG_MAP[route]) return resolveImageUrl(OG_MAP[route], siteBase, OG_MAP[route]);

  // Try prefix match (e.g., /blog/some-slug -> /blog)
  if (route) {
    const prefix = Object.keys(OG_MAP).find(k => k !== '/' && route.startsWith(k));
    if (prefix) return resolveImageUrl(OG_MAP[prefix], siteBase, OG_MAP[prefix]);
  }

  // fallback
  return resolveImageUrl('/images/og-default.svg', siteBase, '/images/og-default.svg');
}
