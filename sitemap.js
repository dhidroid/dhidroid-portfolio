import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/services', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
];

const sitemapPath = join(__dirname, 'public', 'sitemap.xml');

async function generateSitemap() {
    const stream = new SitemapStream({ hostname: 'https://dhidroid.vercel.app' });

    // Create a writable stream to save the sitemap
    const writeStream = createWriteStream(sitemapPath);

    // Pipe the sitemap stream to the file
    stream.pipe(writeStream);

    // Write all links
    links.forEach(link => stream.write(link));

    // End the stream properly
    stream.end();

    try {
        await streamToPromise(stream);
        console.log('Sitemap generated successfully at:', sitemapPath);
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

// Run the function
generateSitemap();