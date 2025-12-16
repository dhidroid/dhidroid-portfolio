#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

async function main() {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  const dataDir = path.join(__dirname, '..', 'src', 'utils', 'Data');
  const about = JSON.parse(fs.readFileSync(path.join(dataDir, 'aboutData.json'))).about || '';
  const heroData = fs.existsSync(path.join(dataDir, 'HeroData.ts')) ? 'see HeroData' : '';

  // Get contributors if GITHUB_TOKEN is provided
  const token = process.env.GITHUB_TOKEN;
  let contributorsMd = '';
  if (token) {
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

  const content = [
    title,
    badges,
    '## About',
    about.split('\n')[0],
    '## Projects & Data',
    '- Projects, Blogs, Skills are sourced from `src/utils/Data`',
    '## Contributors',
    contributorsMd || '- No contributors found or GITHUB_TOKEN not set',
    '## Install',
    'npm install',
    '## Usage',
    (pkg.scripts && pkg.scripts.start) ? `npm run start` : '',
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
