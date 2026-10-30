# dhidroid

Personal portfolio website showcasing projects, blog, and services

![CI](https://github.com/dhidroid/dhidroid-portfolio/actions/workflows/ci.yml/badge.svg)

## About

I'm a passionate mobile app and backend developer specializing in React Native, Go, and cloud services.

## Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **CMS Integration**: Sanity CMS for content management
- **AI Chatbot**: Integrated chatbot using Hugging Face and Web LLM
- **Responsive Design**: Mobile-first design with Framer Motion animations
- **SEO Optimized**: React Helmet for meta tags and sitemap generation
- **Analytics**: Vercel Analytics and Speed Insights
- **Blog System**: Markdown-based blog with syntax highlighting
- **Project Showcase**: Dynamic project portfolio with filtering
- **Contact Integration**: Cal.com embed for scheduling
- **Performance**: Optimized with lazy loading and code splitting

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router

### Backend & CMS

- Sanity CMS
- Node.js (for scripts)

### AI & ML

- Hugging Face Inference
- Hugging Face Transformers.js
- Web LLM

### Tools & Deployment

- Vercel
- GitHub Actions
- ESLint
- Prettier
- Husky

## Projects & Data

- Projects, Blogs, Skills are sourced from `src/utils/Data`

## Getting Started

### Prerequisites

- Node.js 22.20+

- npm

### Installation

```bash

npm ci

```

### Development

```bash

npm run dev

```

### Build

```bash

npm run build

```

## Scripts

- `npm run dev` - Start development server

- `npm run build` - Build for production

- `npm run preview` - Preview production build

- `npm run lint` - Run ESLint

- `npm run format` - Format code with Prettier

## Sanity Studio

The content-management studio is maintained in `sanity-server`.

```bash

cd sanity-server

npm ci

npm run dev

```

## Continuous integration

GitHub Actions audits dependencies and builds both the portfolio and Sanity Studio on pull requests. Changed JavaScript and TypeScript files are linted.

## Contributors

- No contributors found or GITHUB_TOKEN not set
