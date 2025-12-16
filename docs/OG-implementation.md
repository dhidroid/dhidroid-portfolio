# Open Graph & Twitter Card Implementation (React + Vite)

Overview
- Default OG/Twitter meta tags live in `index.html` for site-wide defaults.
- Dynamic/page-level meta tags are handled via `src/components/SEO.tsx` which uses `react-helmet`.
- If a page provides an image, we prefer it. Otherwise, we resolve a per-route default from `src/utils/meta.ts` (see `OG_MAP`) and finally fall back to `/images/og-default.svg` in `/public`.

How to add a route image
1. Place an image in `/public/images` (recommended size: 1200x630px)
2. Add/update `OG_MAP['/your-route'] = '/images/your-image.png'` in `src/utils/meta.ts`.
3. For a specific page component, you can either:
   - Pass `image` to `<SEO image="/images/specific.png" ... />` or
   - Pass `route` only and let the mapping select the image: `<SEO route="/projects" ... />`.

Notes & best practices
- Use absolute image URLs (helper will convert relative public paths to absolute using the configured site base).
- Prefer a dedicated 1200×630 PNG/JPG to ensure consistent previews across sites (SVGs work but some services rasterize them differently).
- Consider setting `VITE_SITE_URL` and update `SEO.tsx` to use `import.meta.env.VITE_SITE_URL` for environment-specific base URLs.

Testing
- Run your app: `npm run dev`.
- Inspect the page source (`View page source`) to confirm `og:image` shows an absolute URL.
- Use the Facebook Sharing Debugger and Twitter Card Validator to preview how your card will look and force re-scrape if needed.

Additions in this repo
- `src/utils/meta.ts` — helpers to resolve images and a per-route `OG_MAP`.
- `src/utils/seo.ts` — generator `generateMetaForRoute(route)` to produce title, description, keywords, canonical URL, and JSON-LD.
- `src/components/SEO.tsx` — accepts `route`, `image`, and `structuredData` props and renders meta tags + JSON-LD.
- `/public/images` — contains fallback images: `og-default.svg`, `og-projects.svg`, `og-blog.svg`, `og-skills.svg`, `og-about.svg`, `og-links.svg`.

How pages use this
- Prefer `generateMetaForRoute` and pass `structuredData` to the `SEO` component to keep metadata consistent.
- For CMS-driven pages (blog detail, project detail), prefer the dataset image when available; otherwise the route fallback is used automatically.

Notes
- The site base URL is `VITE_SITE_URL` (if set) or `https://dhidroid.vercel.app` by default; images are always converted to absolute URLs before being injected into meta tags.
- If you want raster PNG fallbacks instead of SVG, place them in `/public/images` and update `OG_MAP` to reference them.
