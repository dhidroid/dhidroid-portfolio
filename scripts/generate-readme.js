#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let Octokit;
try {
  const octokitModule = await import('octokit');
  Octokit = octokitModule.Octokit;
} catch (e) {
  // Octokit not available
}

async function main() {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  const dataDir = path.join(__dirname, '..', 'src', 'utils', 'Data');
  const about = JSON.parse(fs.readFileSync(path.join(dataDir, 'aboutData.json'))).about || '';
  const heroData = fs.existsSync(path.join(dataDir, 'HeroData.ts')) ? 'see HeroData' : '';

  // Get contributors if GITHUB_TOKEN is provided
  const token = process.env.GITHUB_TOKEN;
  let contributorsMd = '';
  if (token && Octokit) {
    const octo = new Octokit({ auth: token });
    const [owner, repo] = (pkg.repository && pkg.repository.url) ? parseRepo(pkg.repository.url) : ['',''];
    try {
      const { data } = await octo.repos.listContributors({ owner, repo, per_page: 10 });
      contributorsMd = data.map(c => `- [![](${c.avatar_url}&s=40)](${c.html_url}) ${c.login}`).join('\n');
    } catch (err) {
      console.warn('Could not fetch contributors:', err.message);
    }
  }

  const title = `# ${pkg.name} \n\n${pkg.description || ''}`;
  const badges = `![CI](https://github.com/${pkg.name}/actions/workflows/ci.yml/badge.svg)`;

  const features = `## Features\n\n- **Modern Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS\n- **CMS Integration**: Sanity CMS for content management\n- **AI Chatbot**: Integrated chatbot using Hugging Face and Web LLM\n- **Responsive Design**: Mobile-first design with Framer Motion animations\n- **SEO Optimized**: React Helmet for meta tags and sitemap generation\n- **Analytics**: Vercel Analytics and Speed Insights\n- **Blog System**: Markdown-based blog with syntax highlighting\n- **Project Showcase**: Dynamic project portfolio with filtering\n- **Contact Integration**: Cal.com embed for scheduling\n- **Performance**: Optimized with lazy loading and code splitting`;

  const techStack = `## Tech Stack\n\n### Frontend\n- React 19\n- TypeScript\n- Vite\n- Tailwind CSS\n- Framer Motion\n- React Router\n\n### Backend & CMS\n- Sanity CMS\n- Node.js (for scripts)\n\n### AI & ML\n- Hugging Face Inference\n- Web LLM\n- Xenova Transformers\n\n### Tools & Deployment\n- Vercel\n- GitHub Actions\n- ESLint\n- Prettier\n- Husky`;

  const content = [
    title,
    badges,
    '## About',
    about.split('\n')[0],
    features,
    techStack,
    '## Projects & Data',
    '- Projects, Blogs, Skills are sourced from `src/utils/Data`',
    '## Getting Started',
    '### Prerequisites',
    '- Node.js 18+',
    '- npm or yarn',
    '### Installation',
    '```bash',
    'npm install',
    '```',
    '### Development',
    '```bash',
    'npm run dev',
    '```',
    '### Build',
    '```bash',
    'npm run build',
    '```',
    '## Scripts',
    '- `npm run dev` - Start development server',
    '- `npm run build` - Build for production',
    '- `npm run preview` - Preview production build',
    '- `npm run lint` - Run ESLint',
    '- `npm run format` - Format code with Prettier',
    '## Contributors',
    contributorsMd || '- No contributors found or GITHUB_TOKEN not set',
  ].filter(Boolean).join('\n\n');

  fs.writeFileSync(path.join(__dirname, '..', 'README.md'), content);
  console.log('README.md updated');

  function parseRepo(url) {
    // support git+https: or https
    const matched = url.match(/[:/]([^/]+)\/([^/]+)(?:\.git)?$/);
    if (!matched) return ['', ''];
    return [matched[1], matched[2].replace(/\.git$/, '')];
  }
}

main().catch(err => { console.error(err); process.exit(1); });
