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
            "slug": slug.current
          }`);

        const links = [
            { url: '/', changefreq: 'daily', priority: 1.0 },
            { url: '/about', changefreq: 'monthly', priority: 1.0 },
            { url: '/services', changefreq: 'monthly', priority: 1.0 },
            { url: '/bloglist', changefreq: 'monthly', priority: 1.0 },
            { url: "/project", changefreq: "monthly", priority: 1.0 },
            { url: "blog/:slug", changefreq: "daily", priority: 1.0 },
            ...posts.map(p => ({
                url: `/blog/${p.slug}`,
                changefreq: 'daily',
                priority: 1.0,
            })),
        ];

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