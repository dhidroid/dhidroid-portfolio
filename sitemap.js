import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const client = createClient({
    projectId: 'pjmjgioq',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-01-01',
});

const sitemapPath = join(__dirname, 'public', 'sitemap.xml');

async function generateSitemap() {
    const stream = new SitemapStream({ hostname: 'https://dhidroid.vercel.app' });

    try {
        const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] {
            "slug": slug.current,
            _updatedAt
          }`);

        // Static pages with priorities
        const staticLinks = [
            { url: '/', changefreq: 'daily', priority: 1.0 },
            { url: '/about', changefreq: 'monthly', priority: 0.9 },
            { url: '/works', changefreq: 'weekly', priority: 0.9 },
            { url: '/skills', changefreq: 'monthly', priority: 0.8 },
            { url: '/services', changefreq: 'monthly', priority: 0.8 },
            { url: '/pricing', changefreq: 'monthly', priority: 0.8 },
            { url: '/bloglist', changefreq: 'daily', priority: 0.9 },
            { url: '/contact', changefreq: 'monthly', priority: 0.7 },
            { url: '/schedule', changefreq: 'monthly', priority: 0.7 },
            { url: '/changelog', changefreq: 'weekly', priority: 0.5 },
            { url: '/licenses', changefreq: 'yearly', priority: 0.3 },
            { url: '/style-guide', changefreq: 'yearly', priority: 0.3 },
            { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
            { url: '/terms', changefreq: 'yearly', priority: 0.3 },
        ];

        // Dynamic blog posts
        const blogLinks = posts.map(p => ({
            url: `/blog/${p.slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: p._updatedAt ? new Date(p._updatedAt).toISOString().split('T')[0] : undefined,
        }));

        const links = [...staticLinks, ...blogLinks];

        // Create a writable stream to save the sitemap
        const writeStream = createWriteStream(sitemapPath);

        // Pipe the sitemap stream to the file
        stream.pipe(writeStream);

        // Write all links
        links.forEach(link => stream.write(link));

        // End the stream properly
        stream.end();

        await streamToPromise(stream);
        console.log('Sitemap generated successfully at:', sitemapPath);
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

// Run the function
generateSitemap();